-- Database Performance Optimization Indexes
-- Add these indexes to your Prisma schema for better query performance

-- Critical indexes for common query patterns

-- User queries
CREATE INDEX IF NOT EXISTS "User_username_idx" ON "User"("username");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_isProfilePrivate_idx" ON "User"("isProfilePrivate");

-- Follow relationship queries
CREATE INDEX IF NOT EXISTS "Follow_followerId_idx" ON "Follow"("followerId");
CREATE INDEX IF NOT EXISTS "Follow_followingId_idx" ON "Follow"("followingId");
CREATE INDEX IF NOT EXISTS "Follow_followerId_followingId_idx" ON "Follow"("followerId", "followingId");

-- Circle queries
CREATE INDEX IF NOT EXISTS "Circle_creatorId_idx" ON "Circle"("creatorId");
CREATE INDEX IF NOT EXISTS "Circle_isPrivate_idx" ON "Circle"("isPrivate");
CREATE INDEX IF NOT EXISTS "Circle_createdAt_idx" ON "Circle"("createdAt");
CREATE INDEX IF NOT EXISTS "Circle_updatedAt_idx" ON "Circle"("updatedAt");

-- Membership queries
CREATE INDEX IF NOT EXISTS "Membership_userId_idx" ON "Membership"("userId");
CREATE INDEX IF NOT EXISTS "Membership_circleId_idx" ON "Membership"("circleId");
CREATE INDEX IF NOT EXISTS "Membership_userId_circleId_idx" ON "Membership"("userId", "circleId");
CREATE INDEX IF NOT EXISTS "Membership_role_idx" ON "Membership"("role");

-- Album queries
CREATE INDEX IF NOT EXISTS "Album_creatorId_idx" ON "Album"("creatorId");
CREATE INDEX IF NOT EXISTS "Album_circleId_idx" ON "Album"("circleId");
CREATE INDEX IF NOT EXISTS "Album_isPrivate_idx" ON "Album"("isPrivate");
CREATE INDEX IF NOT EXISTS "Album_createdAt_idx" ON "Album"("createdAt");
CREATE INDEX IF NOT EXISTS "Album_creatorId_createdAt_idx" ON "Album"("creatorId", "createdAt");

-- Photo queries
CREATE INDEX IF NOT EXISTS "Photo_albumId_idx" ON "Photo"("albumId");
CREATE INDEX IF NOT EXISTS "Photo_createdAt_idx" ON "Photo"("createdAt");

-- Like queries
CREATE INDEX IF NOT EXISTS "AlbumLike_userId_idx" ON "AlbumLike"("userId");
CREATE INDEX IF NOT EXISTS "AlbumLike_albumId_idx" ON "AlbumLike"("albumId");
CREATE INDEX IF NOT EXISTS "AlbumLike_userId_albumId_idx" ON "AlbumLike"("userId", "albumId");

-- Comment queries
CREATE INDEX IF NOT EXISTS "AlbumComment_albumId_idx" ON "AlbumComment"("albumId");
CREATE INDEX IF NOT EXISTS "AlbumComment_userId_idx" ON "AlbumComment"("userId");
CREATE INDEX IF NOT EXISTS "AlbumComment_createdAt_idx" ON "AlbumComment"("createdAt");

-- Activity queries (for notifications, requests, etc.)
CREATE INDEX IF NOT EXISTS "Activity_userId_idx" ON "Activity"("userId");
CREATE INDEX IF NOT EXISTS "Activity_type_idx" ON "Activity"("type");
CREATE INDEX IF NOT EXISTS "Activity_createdAt_idx" ON "Activity"("createdAt");
CREATE INDEX IF NOT EXISTS "Activity_circleId_idx" ON "Activity"("circleId");
CREATE INDEX IF NOT EXISTS "Activity_userId_type_idx" ON "Activity"("userId", "type");

-- Post queries
CREATE INDEX IF NOT EXISTS "Post_userId_idx" ON "Post"("userId");
CREATE INDEX IF NOT EXISTS "Post_circleId_idx" ON "Post"("circleId");
CREATE INDEX IF NOT EXISTS "Post_createdAt_idx" ON "Post"("createdAt");

-- Composite indexes for complex queries
CREATE INDEX IF NOT EXISTS "Album_privacy_circle_idx" ON "Album"("isPrivate", "circleId");
CREATE INDEX IF NOT EXISTS "Circle_privacy_creator_idx" ON "Circle"("isPrivate", "creatorId");

-- Full-text search indexes (if using PostgreSQL)
-- CREATE INDEX IF NOT EXISTS "User_search_idx" ON "User" USING gin(to_tsvector('english', "name" || ' ' || "username"));
-- CREATE INDEX IF NOT EXISTS "Circle_search_idx" ON "Circle" USING gin(to_tsvector('english', "name" || ' ' || coalesce("description", '')));
-- CREATE INDEX IF NOT EXISTS "Album_search_idx" ON "Album" USING gin(to_tsvector('english', "title" || ' ' || coalesce("description", '')));
