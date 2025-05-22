# Circles - Social Media for Close Communities

![Circles Logo](/public/Logo.svg)

Circles is a modern social media application designed to help people connect in meaningful ways through shared communities. Unlike traditional social platforms that focus on broadcasting to wide audiences, Circles creates intimate spaces for friends, families, and interest groups to share moments that matter.

## 🌟 Features

### Circle Communities
- Create private or public circles for different groups in your life
- Invite friends and family to join your circles
- Share content exclusively within specific circles
- Browse and discover public circles based on interests

### Photo Albums
- Create and share photo albums within your circles
- Upload multiple photos at once with batch uploading
- Comment on and like photos
- Edit album details and manage permissions

### User Experience
- Personalized activity feed showing updates from your circles
- Real-time notifications for new posts, comments, and likes
- User profiles with customizable privacy settings
- Friend requests and circle invitations

### Security & Privacy
- Private circles visible only to members
- Granular privacy controls for user profiles
- Secure authentication system

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Image Storage**: Cloudinary
- **Styling**: Chakra UI, Tailwind CSS
- **Icons**: Font Awesome, Lucide React
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account (for image storage)

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/circles"

# Authentication
AUTH_SECRET="your-auth-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/IDSP-Circle.git
   cd IDSP-Circle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧑‍💻 Development

### Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and services
- `/src/hooks` - Custom React hooks
- `/prisma` - Database schema and migrations
- `/public` - Static assets

---

Developed with ❤️ by the ILHT Team
