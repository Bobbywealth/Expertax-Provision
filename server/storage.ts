import { 
  type Contact, type InsertContact, 
  type Agent, type InsertAgent,
  type Appointment, type InsertAppointment,
  type Document, type InsertDocument,
  type BlogPost, type InsertBlogPost,
  type Testimonial, type InsertTestimonial,
  type User, type InsertUser,
  contacts, agents, appointments, documents, blogPosts, testimonials, users
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import session from "express-session";
import connectPg from "connect-pg-simple";

export interface IStorage {
  // User methods for email/password auth
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  sessionStore: any;
  
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
        name: "Sarah Johnson",
        title: "Senior Tax Advisor, CPA",
        bio: "15+ years specializing in individual and small business tax preparation. Expert in tax planning and IRS representation.",
        email: "sarah@provisionexpertax.com",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        credentials: ["CPA", "Tax Planning", "IRS Representation"]
      },
      {
        name: "Michael Chen",
        title: "Business Tax Specialist, EA",
        bio: "12+ years focusing on corporate tax, partnerships, and complex business structures. Specializes in multi-state tax compliance.",
        email: "michael@provisionexpertax.com",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        credentials: ["Enrolled Agent", "Corporate Tax", "Multi-State"]
      },
      {
        name: "Jennifer Rodriguez",
        title: "Tax Resolution Expert, CPA",
        bio: "10+ years specializing in tax resolution, audit defense, and helping clients resolve complex tax issues with the IRS.",
        email: "jennifer@provisionexpertax.com",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
        credentials: ["CPA", "Tax Resolution", "Audit Defense"]
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
    return await db.select().from(agents);
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

export const storage = new DatabaseStorage();
