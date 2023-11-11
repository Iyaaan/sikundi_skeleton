/*
  Warnings:

  - You are about to drop the `videos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_createdById_fkey";

-- DropTable
DROP TABLE "videos";

-- CreateTable
CREATE TABLE "video" (
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

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
