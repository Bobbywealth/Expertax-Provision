# Overview

Provision ExperTax is a modern tax services website built with React and Express.js. The application provides information about professional tax preparation services, displays team members, offers pricing information, and includes a contact form for potential clients. It features a clean, responsive design using shadcn/ui components and Tailwind CSS for styling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a page-based architecture with components organized into UI components, layout components, and page sections. The application uses a modern React patterns with hooks and functional components throughout.

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contact forms and agent data
- **Storage**: In-memory storage with interface abstraction for future database integration
- **Development**: Vite middleware integration for hot module replacement in development

The backend implements a clean separation between routes, storage, and business logic. The storage layer uses an interface pattern to allow easy switching between in-memory and database storage.

## Data Management
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Shared TypeScript schemas between frontend and backend
- **Validation**: Zod schemas for runtime type checking and validation
- **Database**: PostgreSQL (via Neon Database) with connection pooling

The application uses a shared schema approach where database models, validation schemas, and TypeScript types are defined once and used across both frontend and backend.

## Component Architecture
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Design System**: Consistent theming with CSS custom properties
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: Built-in accessibility features from Radix UI components

## External Dependencies

- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **UI Components**: Radix UI primitives for accessible component foundation
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Google Fonts (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Images**: Unsplash for placeholder images and stock photography
- **Development**: Replit-specific plugins for development environment integration
- **Build Tools**: ESBuild for production server bundling, PostCSS for CSS processing