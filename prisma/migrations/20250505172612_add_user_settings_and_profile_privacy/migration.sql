-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isProfilePrivate" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "birthday" TIMESTAMP NOT NULL;
-- CreateTable
CREATE TABLE "UserSettings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "darkMode" BOOLEAN NOT NULL DEFAULT true,
    "highContrast" BOOLEAN NOT NULL DEFAULT false,
    "fontSize" TEXT NOT NULL DEFAULT 'medium',
    "defaultAlbumPrivacy" BOOLEAN NOT NULL DEFAULT true,
    "muteAlbumContent" BOOLEAN NOT NULL DEFAULT false,
    "muteAlbumComments" BOOLEAN NOT NULL DEFAULT false,
    "enableNotifications" BOOLEAN NOT NULL DEFAULT true,
    "notifyNewMessages" BOOLEAN NOT NULL DEFAULT true,
    "notifyFriendRequests" BOOLEAN NOT NULL DEFAULT true,
    "notifyCircleInvites" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "UserSettings_userId_idx" ON "UserSettings"("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
