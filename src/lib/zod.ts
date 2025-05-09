import {z, object, string} from "zod";

export const signInSchema = object({
    email: string({required_error: "Email is required"}).min(1, "Email is required").email("Invalid email"),
    password: string({required_error: "Password is required"}).min(1, "Password is required").min(7, "Minimum 8 characters").max(32, "Password must be less than 32 characters"),
});

// User model
export const UserSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string().nullable(),
    username: z.string(),
    password: z.string(),
    bio: z.string().nullable(),
    profileImage: z.string().nullable(),
    coverImage: z.string().nullable(),
    isProfilePrivate: z.boolean().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    birthday: z.date(),
});
export type UserType = z.infer<typeof UserSchema>;

// Circle model
export const CircleSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    avatar: z.string().nullable(),
    coverImage: z.string().nullable(),
    isPrivate: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    creatorId: z.number(),
});

// Membership model
export const MembershipSchema = z.object({
    id: z.number(),
    userId: z.number(),
    circleId: z.number(),
    role: z.enum(["MEMBER", "MODERATOR", "ADMIN"]),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// Post model
export const PostSchema = z.object({
    id: z.number(),
    content: z.string(),
    imageUrl: z.string().nullable(),
    videoUrl: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.number(),
    circleId: z.number(),
    musicId: z.number(),
});

// Music model
export const MusicSchema = z.object({
    id: z.number(),
    title: z.string(),
    artist: z.string(),
    albumCover: z.string().nullable(),
    audioUrl: z.string(),
    duration: z.number().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

// SavedMusic model
export const SavedMusicSchema = z.object({
    id: z.number(),
    userId: z.number(),
    musicId: z.number(),
    createdAt: z.date(),
});

// Comment model
export const CommentSchema = z.object({
    id: z.number(),
    content: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.number(),
    postId: z.number(),
});

// Like model
export const LikeSchema = z.object({
    id: z.number(),
    createdAt: z.date(),
    userId: z.number(),
    postId: z.number(),
});

// Follow model
export const FollowSchema = z.object({
    id: z.number(),
    followerId: z.number(),
    followingId: z.number(),
    createdAt: z.date(),
});

// UserSettings model
export const UserSettingsSchema = z.object({
    id: z.number(),
    userId: z.number(),
    darkMode: z.boolean(),
    highContrast: z.boolean(),
    fontSize: z.enum(["small", "medium", "large"]),
    defaultAlbumPrivacy: z.boolean(),
    muteAlbumContent: z.boolean(),
    muteAlbumComments: z.boolean(),
    enableNotifications: z.boolean(),
    notifyNewMessages: z.boolean(),
    notifyFriendRequests: z.boolean(),
    notifyCircleInvites: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
