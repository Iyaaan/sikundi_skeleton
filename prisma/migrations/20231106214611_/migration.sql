/*
  Warnings:

  - You are about to drop the column `featureImageUrlId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latinTitle` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('drafted', 'published', 'soft_deleted', 'pending');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_featureImageUrlId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "featureImageUrlId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featureImageUrl" TEXT,
ADD COLUMN     "latinTitle" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'drafted';

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Media_url_key" ON "Media"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_featureImageUrl_fkey" FOREIGN KEY ("featureImageUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;
