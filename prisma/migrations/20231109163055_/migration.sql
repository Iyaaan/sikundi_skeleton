/*
  Warnings:

  - You are about to drop the column `description` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "description";

-- CreateTable
CREATE TABLE "MediasTags" (
    "id" SERIAL NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "MediasTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MediasTags" ADD CONSTRAINT "MediasTags_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediasTags" ADD CONSTRAINT "MediasTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
