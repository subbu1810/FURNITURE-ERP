# Luxe ERP - Furniture & Interior Design Management

An enterprise-grade SaaS ERP solution for furniture manufacturing, multi-outlet retail, and interior design businesses.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn UI, Recharts, Zustand.
- **Backend**: NestJS, TypeScript, JWT, RBAC.
- **Database**: MySQL 8, Prisma ORM.
- **Realtime**: Socket.io.

## Features

- **Multi-Tenant Ready**: Modular monolith architecture designed for scalability.
- **CRM**: Lead pipeline tracking and follow-up management.
- **Interior Design**: 3D design versioning, client approvals, and gallery.
- **Manufacturing**: BOM (Bill of Materials) and WIP tracking.
- **Inventory**: Multi-warehouse stock management with low-stock alerts.
- **POS**: Fast billing screen for retail outlets with GST support.
- **Project Management**: Site survey measurements and project milestones.

## Setup Instructions

### Backend (Server)

1. Navigate to `/server`
2. Install dependencies: `npm install`
3. Configure `.env` file (see `.env.example`)
4. Run Prisma migrations: `npx prisma migrate dev`
5. Seed initial data: `npm run seed`
6. Start development server: `npm run start:dev`

### Frontend (Client)

1. Navigate to `/client`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Docker

Run the entire stack using Docker Compose:

```bash
docker-compose up --build
```

## Folder Structure

```
/Furniture
  /client          # Next.js Frontend
    /src
      /app         # App Router Pages
      /components  # Reusable UI
      /lib         # Utilities
      /store       # Zustand States
  /server          # NestJS Backend
    /src
      /auth        # Authentication Module
      /users       # User Management
      /prisma      # Database Service
      /manufacturing # Manufacturing Module
    /prisma        # Schema and Migrations
  /docker          # Docker Configuration Files
```
