# Overview

MediTranslate AI is a medical translation application that uses AI to convert complex medical diagnoses into simple, patient-friendly language. The app features a mobile-first design with three main tabs: AI translation, health dashboard, and translation history. It's built as a full-stack web application with React frontend and Express backend, designed to help healthcare providers communicate medical information more effectively to patients.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Build System**: ESBuild for production builds
- **Development**: tsx for TypeScript execution in development

## Data Storage
- **Database**: PostgreSQL as the primary database
- **ORM**: Drizzle ORM with Zod schema validation
- **Connection**: Neon serverless PostgreSQL driver
- **Schema**: Three main tables - diagnoses, health_records, and quick_translations
- **Migrations**: Drizzle Kit for database migrations

## Authentication & Authorization
- **Session-based**: Uses express-session with PostgreSQL storage
- **Storage**: Connect-pg-simple for persisting sessions in database
- **Security**: Built-in session management without external auth providers

## External Dependencies

### AI Services
- **OpenAI API**: GPT-5 model for medical text translation
- **Integration**: Direct API calls for real-time translation of medical diagnoses

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: @neondatabase/serverless driver for database connectivity

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Error Handling**: Runtime error overlay for development debugging

### UI Components
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Font Awesome**: Additional icon support via CDN

### Utility Libraries
- **Date Handling**: date-fns for date manipulation and formatting
- **Validation**: Zod for runtime type checking and schema validation
- **Styling**: clsx and tailwind-merge for conditional CSS classes
- **UUID Generation**: Built-in crypto.randomUUID for unique identifiers