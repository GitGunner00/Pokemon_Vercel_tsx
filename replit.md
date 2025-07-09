# Pokemon Card Collection Manager

## Overview

This is a full-stack web application for managing Pokemon card collections. Built with React frontend and Express backend, it allows users to add, view, edit, and delete Pokemon cards from their collection. The application uses a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components for a polished user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between frontend and backend
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage

### Development Setup
- **TypeScript**: Configured for both client and server with shared types
- **Module System**: ESM modules throughout the application
- **Development Server**: Vite dev server with Express API proxy
- **Hot Reloading**: Full HMR support for frontend development

## Key Components

### Database Schema
- **Pokemon Cards Table**: Stores card information including name, set, rarity, condition, value, and metadata
- **Fields**: id, name, set, number, rarity, condition, value, notes, imageUrl, createdAt
- **Validation**: Zod schemas ensure data integrity across the stack

### API Endpoints
- `GET /api/pokemon-cards` - Retrieve all cards
- `GET /api/pokemon-cards/:id` - Get specific card details
- `POST /api/pokemon-cards` - Add new card to collection
- `PUT /api/pokemon-cards/:id` - Update existing card (planned)
- `DELETE /api/pokemon-cards/:id` - Remove card from collection (planned)

### Frontend Components
- **Home Page**: Main dashboard with collection stats and card grid
- **Add Card Modal**: Form for adding new cards with validation
- **Card Details Modal**: View and edit individual card information
- **Search & Filters**: Filter cards by set, rarity, and condition
- **Collection Stats**: Display total cards, value, and rare card counts

### UI Components
- Complete shadcn/ui component library integration
- Responsive design with mobile-first approach
- Pokemon-themed color scheme and styling
- Toast notifications for user feedback
- Form validation with error handling

## Data Flow

1. **Card Management**: Users can add new cards through a modal form with validation
2. **Collection Display**: Cards are fetched from the API and displayed in a responsive grid
3. **Filtering**: Client-side filtering by search query, set, rarity, and condition
4. **Statistics**: Real-time calculation of collection metrics
5. **State Management**: TanStack Query handles server state with caching and optimistic updates

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Hook Form)
- Express.js for backend API
- Drizzle ORM for database operations
- Neon Database for PostgreSQL hosting

### UI and Styling
- Tailwind CSS for utility-first styling
- Radix UI primitives for accessible components
- Lucide React for icons
- Class Variance Authority for component variants

### Development Tools
- Vite for build tooling and development server
- TypeScript for type safety
- ESBuild for production builds
- Replit-specific plugins for development environment

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: ESBuild bundles Express server to `dist/index.js`
- Database: Drizzle migrations applied via `drizzle-kit push`

### Environment Configuration
- `NODE_ENV`: Controls development vs production behavior
- `DATABASE_URL`: PostgreSQL connection string (required)
- Replit-specific environment detection for development features

### Production Deployment
- Single Node.js process serving both API and static files
- PostgreSQL database with connection pooling
- Static assets served from Express in production

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
