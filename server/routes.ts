import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import { storage } from "./storage";
import { setupAuth, requireAuth } from "./auth";
import { 
  insertContactSchema, insertAppointmentSchema, 
  insertDocumentSchema, insertBlogPostSchema, insertTestimonialSchema 
} from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const uploadStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: uploadStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common document formats
    const allowedMimes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, images, and Office documents are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes are now handled in auth.ts (register, login, logout, user)

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // In a real application, you would send an email here
      // For now, we'll just log the contact submission
      console.log("New contact submission:", contact);
      
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Get all agents
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  // Appointment routes
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.json({ success: true, appointment });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create appointment" });
      }
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });

  app.get("/api/appointments/agent/:agentId", async (req, res) => {
    try {
      const { agentId } = req.params;
      const appointments = await storage.getAppointmentsByAgent(agentId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent appointments" });
    }
  });

  app.patch("/api/appointments/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const appointment = await storage.updateAppointmentStatus(id, status);
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update appointment status" });
    }
  });

  // Calendly integration routes
  app.get("/api/calendly/user", requireAuth, async (req: any, res) => {
    try {
      const response = await fetch('https://api.calendly.com/users/me', {
        headers: {
          'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Calendly API error: ${response.status}`);
      }
      
      const userData = await response.json();
      res.json(userData);
    } catch (error) {
      console.error("Calendly user fetch error:", error);
      res.status(500).json({ message: "Failed to fetch Calendly user data" });
    }
  });

  app.get("/api/calendly/events", requireAuth, async (req: any, res) => {
    try {
      // First get user info to get the user URI
      const userResponse = await fetch('https://api.calendly.com/users/me', {
        headers: {
          'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!userResponse.ok) {
        throw new Error(`Calendly API error: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();
      const userUri = userData.resource.uri;
      
      // Get scheduled events for the user
      const eventsResponse = await fetch(`https://api.calendly.com/scheduled_events?user=${userUri}&sort=start_time:asc`, {
        headers: {
          'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!eventsResponse.ok) {
        throw new Error(`Calendly API error: ${eventsResponse.status}`);
      }
      
      const eventsData = await eventsResponse.json();
      
      // Transform Calendly events to match our appointment format
      const transformedEvents = eventsData.collection.map((event: any) => ({
        id: event.uri.split('/').pop(),
        clientName: event.name || 'Unknown',
        clientEmail: 'calendly-booking@example.com', // We'll get this from invitees
        clientPhone: null,
        service: event.event_type.name,
        agentId: null,
        appointmentDate: event.start_time,
        duration: Math.round((new Date(event.end_time).getTime() - new Date(event.start_time).getTime()) / 60000),
        status: event.status === 'active' ? 'confirmed' : event.status,
        notes: event.location?.join_url || event.location?.location || null,
        createdAt: event.created_at,
        source: 'calendly'
      }));
      
      res.json(transformedEvents);
    } catch (error) {
      console.error("Calendly events fetch error:", error);
      res.status(500).json({ message: "Failed to fetch Calendly events" });
    }
  });

  app.get("/api/calendly/events/:eventId/invitees", requireAuth, async (req: any, res) => {
    try {
      const { eventId } = req.params;
      const response = await fetch(`https://api.calendly.com/scheduled_events/${eventId}/invitees`, {
        headers: {
          'Authorization': `Bearer ${process.env.CALENDLY_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Calendly API error: ${response.status}`);
      }
      
      const inviteesData = await response.json();
      res.json(inviteesData);
    } catch (error) {
      console.error("Calendly invitees fetch error:", error);
      res.status(500).json({ message: "Failed to fetch event invitees" });
    }
  });

  // Secure document download endpoint
  app.get("/api/documents/:id/download", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userEmail = req.user?.claims?.email;
      
      if (!userEmail) {
        return res.status(401).json({ message: "User email not found" });
      }

      // Find the document and verify ownership
      const userDocuments = await storage.getDocumentsByClient(userEmail);
      const document = userDocuments.find(doc => doc.id === id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found or access denied" });
      }

      // Serve the file securely
      const filePath = path.join('uploads', path.basename(document.fileUrl));
      res.download(filePath, document.fileName);
    } catch (error) {
      console.error("Document download error:", error);
      res.status(500).json({ message: "Failed to download document" });
    }
  });

  // Document routes - File upload endpoint
  app.post("/api/documents", requireAuth, upload.single('file'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
      }

      const { documentType } = req.body;
      const userEmail = req.user?.claims?.email;
      
      if (!userEmail) {
        return res.status(401).json({ message: "User email not found" });
      }

      // Validate document type
      const validTypes = ['w2', '1099', 'receipt', 'bank_statement', 'tax_return', 'other'];
      if (!documentType || !validTypes.includes(documentType)) {
        return res.status(400).json({ message: "Invalid or missing document type" });
      }

      const documentData = {
        clientEmail: userEmail,
        fileName: req.file.originalname,
        fileUrl: req.file.filename, // Store filename, will construct secure URL in response
        fileSize: req.file.size,
        documentType,
        status: 'uploaded'
      };

      const document = await storage.createDocument(documentData);
      
      // Return document with secure download URL
      const responseDocument = {
        ...document,
        fileUrl: `/api/documents/${document.id}/download`
      };
      
      res.json({ success: true, document: responseDocument });
    } catch (error) {
      console.error("Document upload error:", error);
      res.status(500).json({ message: "Failed to upload document" });
    }
  });

  app.get("/api/documents", requireAuth, async (req: any, res) => {
    try {
      const userEmail = req.user?.claims?.email;
      if (!userEmail) {
        return res.status(401).json({ message: "User email not found" });
      }
      const documents = await storage.getDocumentsByClient(userEmail);
      
      // Return documents with secure download URLs
      const secureDocuments = documents.map(doc => ({
        ...doc,
        fileUrl: `/api/documents/${doc.id}/download`
      }));
      
      res.json(secureDocuments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.patch("/api/documents/:id/status", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userEmail = req.user?.claims?.email;
      
      if (!userEmail) {
        return res.status(401).json({ message: "User email not found" });
      }

      // Validate status value
      const validStatuses = ['uploaded', 'processing', 'reviewed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      // Find the document and verify ownership
      const userDocuments = await storage.getDocumentsByClient(userEmail);
      const document = userDocuments.find(doc => doc.id === id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found or access denied" });
      }

      const updatedDocument = await storage.updateDocumentStatus(id, status);
      res.json(updatedDocument);
    } catch (error) {
      console.error("Document status update error:", error);
      res.status(500).json({ message: "Failed to update document status" });
    }
  });

  // Blog routes
  app.post("/api/blog", requireAuth, async (req: any, res) => {
    try {
      const blogData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(blogData);
      res.json({ success: true, blogPost });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      } else {
        console.error("Blog post creation error:", error);
        res.status(500).json({ message: "Failed to create blog post" });
      }
    }
  });

  app.get("/api/blog", async (req: any, res) => {
    try {
      const { published } = req.query;
      const requireAuth = req.user; // Check if user is authenticated
      
      // For unauthenticated users, only show published posts
      const showPublished = requireAuth ? 
        (published === 'true' ? true : published === 'false' ? false : undefined) :
        true;
      
      const blogPosts = await storage.getBlogPosts(showPublished);
      res.json(blogPosts);
    } catch (error) {
      console.error("Blog posts fetch error:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req: any, res) => {
    try {
      const { slug } = req.params;
      const blogPost = await storage.getBlogPostBySlug(slug);
      
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      // Don't show unpublished posts to unauthenticated users
      if (!blogPost.published && !req.user) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(blogPost);
    } catch (error) {
      console.error("Blog post fetch error:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.patch("/api/blog/:id", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      
      // Validate updates with a partial schema
      const updateSchema = insertBlogPostSchema.partial().omit({ 
        authorId: true, // Don't allow changing author
        published: true, // Use separate publish endpoint
        publishedAt: true // Managed by publish endpoint
      });
      
      const updates = updateSchema.parse(req.body);
      const blogPost = await storage.updateBlogPost(id, updates);
      res.json(blogPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid update data", errors: error.errors });
      } else {
        console.error("Blog post update error:", error);
        res.status(500).json({ message: "Failed to update blog post" });
      }
    }
  });

  app.patch("/api/blog/:id/publish", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const blogPost = await storage.publishBlogPost(id);
      res.json(blogPost);
    } catch (error) {
      console.error("Blog post publish error:", error);
      res.status(500).json({ message: "Failed to publish blog post" });
    }
  });

  // Testimonial routes
  app.post("/api/testimonials", async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.json({ success: true, testimonial });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      } else {
        console.error("Testimonial creation error:", error);
        res.status(500).json({ message: "Failed to submit testimonial" });
      }
    }
  });

  app.get("/api/testimonials", async (req: any, res) => {
    try {
      const { approved } = req.query;
      const requireAuth = req.user; // Check if user is authenticated
      
      // For unauthenticated users, only show approved testimonials
      const showApproved = requireAuth ? 
        (approved === 'true' ? true : approved === 'false' ? false : undefined) :
        true;
      
      const testimonials = await storage.getTestimonials(showApproved);
      res.json(testimonials);
    } catch (error) {
      console.error("Testimonials fetch error:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.patch("/api/testimonials/:id/approve", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.approveTestimonial(id);
      res.json(testimonial);
    } catch (error) {
      console.error("Testimonial approve error:", error);
      res.status(500).json({ message: "Failed to approve testimonial" });
    }
  });

  app.patch("/api/testimonials/:id/feature", requireAuth, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { featured } = req.body;
      const testimonial = await storage.featureTestimonial(id, featured);
      res.json(testimonial);
    } catch (error) {
      console.error("Testimonial feature error:", error);
      res.status(500).json({ message: "Failed to update testimonial feature status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
