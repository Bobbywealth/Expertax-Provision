import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  // We don't throw here to allow the server to start in dev mode without a DB
  console.warn(
    "Warning: DATABASE_URL is not set. Database storage will not be available.",
  );
}

export const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL }) : undefined;
export const db = pool ? drizzle({ client: pool, schema }) : undefined;
