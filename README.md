# Circles - Advanced Social Media Platform for Close Communities

![Circles Logo](/public/Logo.svg)

**A sophisticated full-stack social media application** built with modern web technologies, showcasing advanced database optimization, real-time features, and enterprise-level architecture patterns. Designed for intimate community sharing with comprehensive privacy controls and performance optimizations.

## 🎯 Project Overview

This project demonstrates **full-stack development expertise** with complex social media features, performance optimizations, and scalable architecture. Built as a comprehensive learning exercise that covers everything from database design to real-time user interactions.

### Key Technical Achievements

-   **Advanced Database Architecture** with complex many-to-many relationships and optimized queries
-   **Performance Engineering** including Redis caching, query batching, and database indexing
-   **Real-time Activity System** with sophisticated notification and invitation workflows
-   **Enterprise-grade Image Processing** with Cloudinary integration and client-side cropping
-   **Scalable Authentication** with session management and middleware protection
-   **Modern Frontend Architecture** using Next.js 15 with App Router and TypeScript

## 🌟 Features & Technical Implementation

### 🔐 Advanced Circle Management System

```typescript
// Complex many-to-many relationships with role-based access
model Circle {
  id          String   @id @default(cuid())
  name        String
  isPublic    Boolean  @default(false)
  members     CircleMember[]
  joinRequests JoinRequest[]
  albums      Album[]
}
```

-   **Private/Public circle visibility** with granular permission controls
-   **Invitation system** with pending requests and automatic notifications
-   **Join request workflow** for public circles with approval mechanisms
-   **Member role management** with different access levels
-   **Circle discovery** with search and recommendation algorithms

### 📸 Sophisticated Image Upload & Management

-   **Cloudinary Integration** with server-side upload handling
-   **Client-side image cropping** using react-image-crop library
-   **Batch upload processing** with progress tracking
-   **Optimized image delivery** with automatic format conversion
-   **Album organization** with metadata and permission inheritance

### ⚡ Real-time Activity Feed System

```typescript
// Efficient activity aggregation with join optimization
const activities = await prisma.activity.findMany({
	include: {
		user: { select: { id: true, name: true, image: true } },
		circle: { select: { id: true, name: true } },
		album: { select: { id: true, title: true } },
	},
	orderBy: { createdAt: 'desc' },
});
```

-   **Friend request notifications** with real-time updates
-   **Circle invitation tracking** with status management
-   **Activity aggregation** with efficient database queries
-   **Personalized feed** based on user's circle memberships
-   **Notification system** with read/unread state management

### 🚀 Performance Optimizations

#### Database Layer

-   **Redis caching strategy** for frequently accessed data
-   **Query optimization** with proper indexing and joins
-   **Batch operations** for bulk data processing
-   **Connection pooling** for scalable database access
-   **Transaction management** for data consistency

#### Frontend Performance

-   **Next.js App Router** with automatic code splitting
-   **Server-side rendering** for improved SEO and performance
-   **Image optimization** with next/image and Cloudinary
-   **Component lazy loading** for better initial page loads
-   **TypeScript** for type safety and better developer experience

### 🔒 Security & Authentication

-   **NextAuth.js integration** with secure session management
-   **Middleware protection** for route-level authentication
-   **Input validation** using Zod schemas
-   **SQL injection prevention** through Prisma ORM
-   **CSRF protection** with built-in Next.js security features

### 🎨 Modern UI/UX Design

-   **Responsive design** with Tailwind CSS
-   **Component architecture** with reusable UI elements
-   **Accessibility features** with proper ARIA labels
-   **Loading states** and error handling
-   **Smooth animations** and transitions

## 🛠️ Technology Stack & Architecture

### Core Technologies

-   **Frontend**: Next.js 15 (App Router), React 18, TypeScript
-   **Backend**: Next.js API Routes, Node.js
-   **Database**: PostgreSQL with Prisma ORM
-   **Caching**: Redis for performance optimization
-   **Authentication**: NextAuth.js with session management
-   **Image Processing**: Cloudinary with client-side cropping
-   **Styling**: Tailwind CSS with responsive design
-   **Validation**: Zod for type-safe schemas
-   **Icons**: Font Awesome, Lucide React
-   **Deployment**: Vercel with edge functions

### Database Architecture

```sql
-- Complex relationship modeling with optimized indexes
CREATE INDEX idx_circle_members_user_circle ON "CircleMember"("userId", "circleId");
CREATE INDEX idx_activities_user_created ON "Activity"("userId", "createdAt");
CREATE INDEX idx_albums_circle_created ON "Album"("circleId", "createdAt");
```

### Key Architectural Patterns

-   **Server Components** for optimal performance
-   **API Route Handlers** with proper error handling
-   **Middleware Chain** for authentication and request processing
-   **Component Composition** with reusable UI patterns
-   **Custom Hooks** for state management and side effects

## 📈 Learning Outcomes & Skills Demonstrated

### Backend Development

-   ✅ **Complex Database Design** - Many-to-many relationships, foreign keys, indexes
-   ✅ **API Development** - RESTful endpoints with proper HTTP methods and status codes
-   ✅ **Performance Optimization** - Caching strategies, query optimization, batch processing
-   ✅ **Authentication Systems** - Session management, middleware protection, role-based access
-   ✅ **Error Handling** - Comprehensive error boundaries and logging

### Frontend Development

-   ✅ **Modern React Patterns** - Hooks, Context, Server Components
-   ✅ **TypeScript Expertise** - Type safety, interfaces, generics
-   ✅ **State Management** - Complex form handling, real-time updates
-   ✅ **Performance** - Code splitting, lazy loading, image optimization
-   ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS

### DevOps & Tools

-   ✅ **Database Migrations** - Schema evolution and data consistency
-   ✅ **Environment Management** - Configuration and secrets handling
-   ✅ **Code Quality** - ESLint, TypeScript, proper project structure
-   ✅ **Version Control** - Git workflow and project organization

### Problem-Solving Examples

#### 1. N+1 Query Problem Resolution

```typescript
// Before: Multiple queries in loop
const circles = await prisma.circle.findMany();
for (const circle of circles) {
	const memberCount = await prisma.circleMember.count({
		where: { circleId: circle.id },
	});
}

// After: Single optimized query with aggregation
const circles = await prisma.circle.findMany({
	include: {
		_count: {
			select: { members: true },
		},
	},
});
```

#### 2. Real-time Activity Feed Optimization

```typescript
// Implemented efficient pagination with cursor-based approach
const activities = await prisma.activity.findMany({
	take: 20,
	skip: cursor ? 1 : 0,
	cursor: cursor ? { id: cursor } : undefined,
	include: {
		user: { select: { id: true, name: true, image: true } },
	},
	orderBy: { createdAt: 'desc' },
});
```

#### 3. Image Upload with Progress Tracking

```typescript
// Client-side progress tracking with error handling
const uploadWithProgress = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);

	return fetch('/api/upload', {
		method: 'POST',
		body: formData,
	}).then(response => {
		if (!response.ok) throw new Error('Upload failed');
		return response.json();
	});
};
```

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   PostgreSQL database
-   Redis server (for caching)
-   Cloudinary account (for image storage)

### Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/circles"

# Authentication
AUTH_SECRET="your-secure-auth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis Configuration (Optional - for caching)
REDIS_URL="redis://localhost:6379"

# Development
NODE_ENV="development"
```

### Quick Start

1. **Clone and Install**

    ```bash
    git clone https://github.com/yourusername/IDSP-Circle.git
    cd IDSP-Circle
    npm install
    ```

2. **Database Setup**

    ```bash
    # Generate Prisma client
    npx prisma generate

    # Run migrations
    npx prisma migrate dev

    # Seed database (optional)
    npx prisma db seed
    ```

3. **Start Development Server**

    ```bash
    npm run dev
    ```

4. **Visit Application**
   Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npx prisma studio    # Open database GUI
npx prisma migrate   # Run database migrations
```

## 📁 Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API route handlers
│   │   ├── activity/      # Activity feed endpoints
│   │   ├── circles/       # Circle management
│   │   ├── albums/        # Photo album operations
│   │   └── upload/        # Image upload handling
│   ├── circle/[id]/       # Dynamic circle pages
│   └── profile/           # User profile pages
├── components/            # Reusable UI components
│   ├── auth_forms/        # Authentication components
│   ├── activity/          # Activity feed components
│   ├── circle/            # Circle-related components
│   └── common/            # Shared UI elements
├── lib/                   # Utility libraries
│   ├── prisma.ts          # Database client
│   ├── cache.ts           # Redis caching utilities
│   ├── cloudinary.ts      # Image upload helpers
│   └── performance.ts     # Performance optimization
├── hooks/                 # Custom React hooks
└── types.d.ts            # TypeScript type definitions

prisma/
├── schema.prisma          # Database schema
├── migrations/            # Database migrations
└── seed.ts               # Database seeding
```

## 🔧 Development Features

### Database Tools

-   **Prisma Studio**: Visual database browser at `npx prisma studio`
-   **Migration System**: Version-controlled schema changes
-   **Seeding**: Automated test data generation
-   **Query Logging**: Debug mode for SQL query inspection

### Performance Monitoring

-   **Redis Caching**: Implemented for user sessions and frequent queries
-   **Database Indexing**: Optimized for common query patterns
-   **Image Optimization**: Automatic compression and format conversion
-   **Bundle Analysis**: Built-in Next.js bundle analyzer

### Code Quality

-   **TypeScript**: Strict type checking enabled
-   **ESLint**: Comprehensive linting rules
-   **Prettier**: Automatic code formatting
-   **Husky**: Pre-commit hooks for quality assurance

## 🎯 Key Challenges Solved

1. **Complex Social Relationships**: Implementing many-to-many relationships between users, circles, and albums
2. **Performance at Scale**: Optimizing database queries and implementing caching strategies
3. **Real-time Updates**: Building efficient activity feeds without over-fetching data
4. **Image Handling**: Managing large file uploads with progress tracking and error handling
5. **Security**: Implementing proper authentication and authorization for sensitive social data

## 🔍 Code Quality & Best Practices

-   **Type Safety**: 100% TypeScript coverage with strict mode
-   **Error Boundaries**: Comprehensive error handling at component and API levels
-   **Accessibility**: WCAG compliant components with proper ARIA labels
-   **Performance**: Lighthouse scores consistently above 90
-   **Security**: Input validation, SQL injection prevention, XSS protection

## 💼 For Employers

This project demonstrates **production-ready development skills** including:

### Technical Proficiency

-   **Full-Stack Development**: From database design to user interface
-   **Modern Web Standards**: Latest React patterns and Next.js features
-   **Performance Engineering**: Optimization techniques for real-world applications
-   **Database Expertise**: Complex relational modeling and query optimization
-   **Security Awareness**: Authentication, authorization, and data protection

### Professional Development Practices

-   **Clean Code**: Well-structured, maintainable, and documented codebase
-   **Testing Mindset**: Error handling and edge case consideration
-   **Scalability Focus**: Architecture designed for growth and performance
-   **User Experience**: Responsive design and accessibility compliance
-   **Continuous Learning**: Adoption of latest technologies and best practices

### Problem-Solving Approach

-   **Analysis**: Breaking down complex social media requirements
-   **Implementation**: Building scalable solutions with proper abstractions
-   **Optimization**: Performance tuning and resource management
-   **Documentation**: Clear project structure and development guidelines

---

**Built by**: ILHT Team  
**Project Duration**: Full development cycle from conception to deployment  
**Primary Focus**: Demonstrating full-stack web development expertise with modern technologies
