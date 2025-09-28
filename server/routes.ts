import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, insertAppointmentSchema, 
  insertDocumentSchema, insertBlogPostSchema, insertTestimonialSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Document routes
  app.post("/api/documents", async (req, res) => {
    try {
      const documentData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(documentData);
      res.json({ success: true, document });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid document data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to upload document" });
      }
    }
  });

  app.get("/api/documents/:clientEmail", async (req, res) => {
    try {
      const { clientEmail } = req.params;
      const documents = await storage.getDocumentsByClient(clientEmail);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.patch("/api/documents/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const document = await storage.updateDocumentStatus(id, status);
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: "Failed to update document status" });
    }
  });

  // Blog routes
  app.post("/api/blog", async (req, res) => {
    try {
      const blogData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(blogData);
      res.json({ success: true, blogPost });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create blog post" });
      }
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const { published } = req.query;
      const blogPosts = await storage.getBlogPosts(
        published === 'true' ? true : published === 'false' ? false : undefined
      );
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const blogPost = await storage.getBlogPostBySlug(slug);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const blogPost = await storage.updateBlogPost(id, updates);
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.patch("/api/blog/:id/publish", async (req, res) => {
    try {
      const { id } = req.params;
      const blogPost = await storage.publishBlogPost(id);
      res.json(blogPost);
    } catch (error) {
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
        res.status(500).json({ message: "Failed to submit testimonial" });
      }
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const { approved } = req.query;
      const testimonials = await storage.getTestimonials(
        approved === 'true' ? true : approved === 'false' ? false : undefined
      );
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.patch("/api/testimonials/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await storage.approveTestimonial(id);
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to approve testimonial" });
    }
  });

  app.patch("/api/testimonials/:id/feature", async (req, res) => {
    try {
      const { id } = req.params;
      const { featured } = req.body;
      const testimonial = await storage.featureTestimonial(id, featured);
      res.json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to update testimonial feature status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
