/*
  Warnings:

  - You are about to drop the `graphic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "graphic" DROP CONSTRAINT "graphic_createdById_fkey";

-- DropForeignKey
ALTER TABLE "graphic" DROP CONSTRAINT "graphic_graphicsUrl_fkey";

-- DropForeignKey
ALTER TABLE "video" DROP CONSTRAINT "video_createdById_fkey";

-- DropTable
DROP TABLE "graphic";

-- DropTable
DROP TABLE "video";

-- CreateTable
CREATE TABLE "Graphic" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,
    "graphicsUrl" TEXT,
    "title" TEXT NOT NULL,
    "longTitle" TEXT,
    "latinTitle" TEXT,
    "description" TEXT,
    "language" "Lang" NOT NULL DEFAULT 'EN',
    "status" "Status" NOT NULL DEFAULT 'drafted',

    CONSTRAINT "Graphic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,
    "YoutubeUrl" TEXT,
    "title" TEXT NOT NULL,
    "longTitle" TEXT,
    "latinTitle" TEXT,
    "description" TEXT,
    "language" "Lang" NOT NULL DEFAULT 'EN',
    "status" "Status" NOT NULL DEFAULT 'drafted',

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Graphic" ADD CONSTRAINT "Graphic_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graphic" ADD CONSTRAINT "Graphic_graphicsUrl_fkey" FOREIGN KEY ("graphicsUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
