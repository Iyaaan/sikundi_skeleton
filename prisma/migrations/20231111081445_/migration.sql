/*
  Warnings:

  - You are about to drop the column `profilePictureId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_profilePictureId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePictureId",
ADD COLUMN     "profilePictureUrl" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_profilePictureUrl_fkey" FOREIGN KEY ("profilePictureUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;
