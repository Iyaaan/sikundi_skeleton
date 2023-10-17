/*
  Warnings:

  - You are about to drop the column `action` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "action",
DROP COLUMN "model";

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER,
    "model" "Model" NOT NULL,
    "action" "Action" NOT NULL,
    "fields" JSONB NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_roleId_key" ON "Permission"("roleId");

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
