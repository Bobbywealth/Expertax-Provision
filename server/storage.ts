import { type Contact, type InsertContact, type Agent, type InsertAgent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Agent methods
  getAgents(): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
}

export class MemStorage implements IStorage {
  private contacts: Map<string, Contact>;
  private agents: Map<string, Agent>;

  constructor() {
    this.contacts = new Map();
    this.agents = new Map();
    this.seedAgents();
  }

  private seedAgents() {
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

    sampleAgents.forEach(agent => {
      this.createAgent(agent);
    });
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact,
      phone: insertContact.phone ?? null,
      service: insertContact.service ?? null,
      message: insertContact.message ?? null,
      id, 
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const id = randomUUID();
    const agent: Agent = { ...insertAgent, id };
    this.agents.set(id, agent);
    return agent;
  }
}

export const storage = new MemStorage();
