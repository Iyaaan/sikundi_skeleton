/*
  Warnings:

  - You are about to drop the column `userName_en` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userNameEn]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_userName_en_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userName_en",
ADD COLUMN     "userNameEn" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_userNameEn_key" ON "User"("userNameEn");
