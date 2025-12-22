import {
  type Contact,
  type InsertContact,
  type Agent,
  type InsertAgent,
  type Appointment,
  type InsertAppointment,
  type Document,
  type InsertDocument,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type User,
  type InsertUser,
  contacts,
  agents,
  appointments,
  documents,
  blogPosts,
  testimonials,
  users,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import session from "express-session";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";

// Only import and initialize the database when DATABASE_URL is present.
// This allows local preview/dev to run without provisioning Postgres.
let db: any | undefined;
if (process.env.DATABASE_URL) {
  const mod = await import("./db");
  db = mod.db;
}

export interface IStorage {
  // User methods for email/password auth
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  sessionStore: any;
  initializeData(): Promise<void>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Agent methods
  getAgents(): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  getAppointmentsByAgent(agentId: string): Promise<Appointment[]>;
  updateAppointmentStatus(id: string, status: string): Promise<Appointment>;
  
  // Document methods
  createDocument(document: InsertDocument): Promise<Document>;
  getDocumentsByClient(clientEmail: string): Promise<Document[]>;
  updateDocumentStatus(id: string, status: string): Promise<Document>;
  
  // Blog methods
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost>;
  publishBlogPost(id: string): Promise<BlogPost>;
  
  // Testimonial methods
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(approved?: boolean): Promise<Testimonial[]>;
  approveTestimonial(id: string): Promise<Testimonial>;
  featureTestimonial(id: string, featured: boolean): Promise<Testimonial>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL must be set to use DatabaseStorage");
    }
    if (!db) {
      throw new Error("Database client was not initialized");
    }
    // Setup session store for PostgreSQL
    const PostgresSessionStore = connectPg(session);
    
    this.sessionStore = new PostgresSessionStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      createTableIfMissing: false, // Table already exists from Drizzle schema
      tableName: 'sessions', // Use the existing sessions table
    });
  }

  // User methods for email/password auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  private async seedAgents() {
    // Direct database check to prevent recursion
    const existingAgents = await db.select().from(agents);
    if (existingAgents.length > 0) return; // Already seeded

    const sampleAgents: InsertAgent[] = [
      {
        name: "Sandy",
        title: "Tax Preparation Specialist, CPA",
        bio: "Experienced tax professional specializing in individual and family tax preparation. Dedicated to helping clients maximize their refunds and achieve financial peace of mind.",
        email: "sandy@provisionexpertax.com",
        imageUrl: "https://iili.io/f1vE9Qp.jpg",
        credentials: ["CPA", "Individual Tax Prep", "+1 more"]
      },
      {
        name: "AI Tax Agent",
        title: "Automated Tax Assistant",
        bio: "Our cutting-edge AI technology provides instant calculations, preliminary tax guidance, and 24/7 support. Perfect for quick questions and simple tax scenarios.",
        email: "ai@provisionexpertax.com",
        imageUrl: "https://i.ibb.co/N7gZd3Z/ai-tax-agent-professional.png",
        credentials: ["AI Technology", "24/7 Support", "+2 more"]
      },
      {
        name: "Jennifer Constantino",
        title: "Senior Tax Consultant",
        bio: "Dedicated tax professional based in Hollywood, FL, providing comprehensive tax preparation and consultation services. Committed to delivering personalized financial guidance.",
        email: "jennconstantino93@gmail.com",
        imageUrl: "https://iili.io/f1vNNN1.jpg",
        credentials: ["Tax Preparation", "Business Consulting", "+1 more"]
      }
    ];

    for (const agent of sampleAgents) {
      await this.createAgent(agent);
    }
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Agent methods
  async getAgents(): Promise<Agent[]> {
    const allAgents = await db.select().from(agents);
    
    // Custom ordering: Sandy, AI Tax Agent, Jennifer Constantino
    const order = ['Sandy', 'AI Tax Agent', 'Jennifer Constantino'];
    return allAgents.sort((a, b) => {
      const aIndex = order.indexOf(a.name);
      const bIndex = order.indexOf(b.name);
      
      // If both found in order array, sort by their position
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      
      // If only one found, put it first
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      
      // If neither found, keep original order
      return 0;
    });
  }

  async initializeData(): Promise<void> {
    await this.seedAgents();
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db
      .insert(agents)
      .values(insertAgent)
      .returning();
    return agent;
  }

  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db
      .insert(appointments)
      .values(insertAppointment)
      .returning();
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments).orderBy(desc(appointments.createdAt));
  }

  async getAppointmentsByAgent(agentId: string): Promise<Appointment[]> {
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.agentId, agentId))
      .orderBy(desc(appointments.appointmentDate));
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment> {
    const [appointment] = await db
      .update(appointments)
      .set({ status })
      .where(eq(appointments.id, id))
      .returning();
    return appointment;
  }

  // Document methods
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [document] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    return document;
  }

  async getDocumentsByClient(clientEmail: string): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.clientEmail, clientEmail))
      .orderBy(desc(documents.uploadedAt));
  }

  async updateDocumentStatus(id: string, status: string): Promise<Document> {
    const [document] = await db
      .update(documents)
      .set({ status })
      .where(eq(documents.id, id))
      .returning();
    return document;
  }

  // Blog methods
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return blogPost;
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    if (published !== undefined) {
      return await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.published, published))
        .orderBy(desc(blogPosts.createdAt));
    }
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [blogPost] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return blogPost || undefined;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [blogPost] = await db
      .update(blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost;
  }

  async publishBlogPost(id: string): Promise<BlogPost> {
    const [blogPost] = await db
      .update(blogPosts)
      .set({ published: true, publishedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost;
  }

  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async getTestimonials(approved?: boolean): Promise<Testimonial[]> {
    if (approved !== undefined) {
      return await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.approved, approved))
        .orderBy(desc(testimonials.createdAt));
    }
    return await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
  }

  async approveTestimonial(id: string): Promise<Testimonial> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ approved: true })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }

  async featureTestimonial(id: string, featured: boolean): Promise<Testimonial> {
    const [testimonial] = await db
      .update(testimonials)
      .set({ featured })
      .where(eq(testimonials.id, id))
      .returning();
    return testimonial;
  }
}

class MemoryStorage implements IStorage {
  sessionStore: any;

  private contactsData: Contact[] = [];
  private agentsData: Agent[] = [];
  private appointmentsData: Appointment[] = [];
  private documentsData: Document[] = [];
  private blogPostsData: BlogPost[] = [];
  private testimonialsData: Testimonial[] = [];
  private usersData: User[] = [];

  constructor() {
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 24 * 60 * 60 * 1000, // prune expired entries daily
    });
  }

  async initializeData(): Promise<void> {
    await this.seedAgents();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.usersData.find((u) => u.id === id);
  }

  async createUser(userData: InsertUser): Promise<User> {
    const now = new Date();
    const user: User = {
      id: randomUUID(),
      username: userData.username,
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName ?? null,
      lastName: userData.lastName ?? null,
      role: "admin",
      createdAt: now,
      updatedAt: now,
    };
    this.usersData.push(user);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.usersData.find((u) => u.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.usersData.find((u) => u.email === email);
  }

  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: randomUUID(),
      firstName: insertContact.firstName,
      lastName: insertContact.lastName,
      email: insertContact.email,
      phone: insertContact.phone ?? null,
      service: insertContact.service ?? null,
      message: insertContact.message ?? null,
      createdAt: new Date(),
    };
    this.contactsData.push(contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return [...this.contactsData].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  // Agent methods
  private async seedAgents() {
    if (this.agentsData.length > 0) return;
    const sampleAgents: InsertAgent[] = [
      {
        name: "Sandy",
        title: "Tax Preparation Specialist, CPA",
        bio: "Experienced tax professional specializing in individual and family tax preparation. Dedicated to helping clients maximize their refunds and achieve financial peace of mind.",
        email: "sandy@provisionexpertax.com",
        imageUrl: "https://iili.io/f1vE9Qp.jpg",
        credentials: ["CPA", "Individual Tax Prep", "+1 more"],
      },
      {
        name: "AI Tax Agent",
        title: "Automated Tax Assistant",
        bio: "Our cutting-edge AI technology provides instant calculations, preliminary tax guidance, and 24/7 support. Perfect for quick questions and simple tax scenarios.",
        email: "ai@provisionexpertax.com",
        imageUrl: "https://i.ibb.co/N7gZd3Z/ai-tax-agent-professional.png",
        credentials: ["AI Technology", "24/7 Support", "+2 more"],
      },
      {
        name: "Jennifer Constantino",
        title: "Senior Tax Consultant",
        bio: "Dedicated tax professional based in Hollywood, FL, providing comprehensive tax preparation and consultation services. Committed to delivering personalized financial guidance.",
        email: "jennconstantino93@gmail.com",
        imageUrl: "https://iili.io/f1vNNN1.jpg",
        credentials: ["Tax Preparation", "Business Consulting", "+1 more"],
      },
    ];

    for (const agent of sampleAgents) {
      await this.createAgent(agent);
    }
  }

  async getAgents(): Promise<Agent[]> {
    const order = ["Sandy", "AI Tax Agent", "Jennifer Constantino"];
    return [...this.agentsData].sort((a, b) => {
      const aIndex = order.indexOf(a.name);
      const bIndex = order.indexOf(b.name);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const agent: Agent = {
      id: randomUUID(),
      name: insertAgent.name,
      title: insertAgent.title,
      bio: insertAgent.bio,
      email: insertAgent.email,
      imageUrl: insertAgent.imageUrl,
      credentials: insertAgent.credentials,
    };
    this.agentsData.push(agent);
    return agent;
  }

  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const appointment: Appointment = {
      id: randomUUID(),
      clientName: insertAppointment.clientName,
      clientEmail: insertAppointment.clientEmail,
      clientPhone: insertAppointment.clientPhone ?? null,
      service: insertAppointment.service,
      agentId: insertAppointment.agentId ?? null,
      appointmentDate: insertAppointment.appointmentDate,
      duration: insertAppointment.duration ?? 60,
      status: insertAppointment.status ?? "pending",
      notes: insertAppointment.notes ?? null,
      createdAt: new Date(),
    };
    this.appointmentsData.push(appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return [...this.appointmentsData].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async getAppointmentsByAgent(agentId: string): Promise<Appointment[]> {
    return this.appointmentsData
      .filter((a) => a.agentId === agentId)
      .sort((a, b) => b.appointmentDate.getTime() - a.appointmentDate.getTime());
  }

  async updateAppointmentStatus(id: string, status: string): Promise<Appointment> {
    const appt = this.appointmentsData.find((a) => a.id === id);
    if (!appt) throw new Error("Appointment not found");
    appt.status = status as any;
    return appt;
  }

  // Document methods
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const document: Document = {
      id: randomUUID(),
      clientEmail: insertDocument.clientEmail,
      fileName: insertDocument.fileName,
      fileUrl: insertDocument.fileUrl,
      fileSize: insertDocument.fileSize,
      documentType: insertDocument.documentType,
      status: insertDocument.status ?? "uploaded",
      uploadedAt: new Date(),
    };
    this.documentsData.push(document);
    return document;
  }

  async getDocumentsByClient(clientEmail: string): Promise<Document[]> {
    return this.documentsData
      .filter((d) => d.clientEmail === clientEmail)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async updateDocumentStatus(id: string, status: string): Promise<Document> {
    const doc = this.documentsData.find((d) => d.id === id);
    if (!doc) throw new Error("Document not found");
    doc.status = status;
    return doc;
  }

  // Blog methods
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const now = new Date();
    const post: BlogPost = {
      id: randomUUID(),
      title: insertBlogPost.title,
      slug: insertBlogPost.slug,
      excerpt: insertBlogPost.excerpt,
      content: insertBlogPost.content,
      category: insertBlogPost.category,
      authorId: insertBlogPost.authorId ?? null,
      published: insertBlogPost.published ?? false,
      publishedAt: insertBlogPost.publishedAt ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.blogPostsData.push(post);
    return post;
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const posts =
      published === undefined
        ? this.blogPostsData
        : this.blogPostsData.filter((p) => p.published === published);
    return [...posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPostsData.find((p) => p.slug === slug);
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost> {
    const post = this.blogPostsData.find((p) => p.id === id);
    if (!post) throw new Error("Blog post not found");
    Object.assign(post, updates);
    post.updatedAt = new Date();
    return post;
  }

  async publishBlogPost(id: string): Promise<BlogPost> {
    const post = this.blogPostsData.find((p) => p.id === id);
    if (!post) throw new Error("Blog post not found");
    post.published = true;
    post.publishedAt = new Date();
    post.updatedAt = new Date();
    return post;
  }

  // Testimonial methods
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const testimonial: Testimonial = {
      id: randomUUID(),
      clientName: insertTestimonial.clientName,
      clientEmail: insertTestimonial.clientEmail,
      rating: insertTestimonial.rating,
      testimonialText: insertTestimonial.testimonialText,
      service: insertTestimonial.service ?? null,
      approved: insertTestimonial.approved ?? false,
      featured: insertTestimonial.featured ?? false,
      createdAt: new Date(),
    };
    this.testimonialsData.push(testimonial);
    return testimonial;
  }

  async getTestimonials(approved?: boolean): Promise<Testimonial[]> {
    const list =
      approved === undefined
        ? this.testimonialsData
        : this.testimonialsData.filter((t) => t.approved === approved);
    return [...list].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async approveTestimonial(id: string): Promise<Testimonial> {
    const t = this.testimonialsData.find((x) => x.id === id);
    if (!t) throw new Error("Testimonial not found");
    t.approved = true;
    return t;
  }

  async featureTestimonial(id: string, featured: boolean): Promise<Testimonial> {
    const t = this.testimonialsData.find((x) => x.id === id);
    if (!t) throw new Error("Testimonial not found");
    t.featured = featured;
    return t;
  }
}

export const storage: IStorage =
  process.env.DATABASE_URL ? new DatabaseStorage() : new MemoryStorage();
