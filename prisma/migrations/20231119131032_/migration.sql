/*
  Warnings:

  - A unique constraint covering the columns `[userName_en]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userName_en" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_en_key" ON "User"("userName_en");
