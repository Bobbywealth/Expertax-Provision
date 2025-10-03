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
        name: "Sandy",
        title: "Tax Preparation Specialist, CPA",
        bio: "Experienced tax professional specializing in individual and family tax preparation. Dedicated to helping clients maximize their refunds and achieve financial peace of mind.",
        email: "sandy@provisionexpertax.com",
        imageUrl: "https://i.ibb.co/FzY9JsH/IMG-6644.jpg",
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
        imageUrl: "https://i.ibb.co/WnwqvGR/IMG-6643.jpg",
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

export const storage = new DatabaseStorage();
