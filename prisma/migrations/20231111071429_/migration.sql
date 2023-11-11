-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,
    "featureImageUrl" TEXT,
    "title" TEXT NOT NULL,
    "longTitle" TEXT,
    "latinTitle" TEXT,
    "description" TEXT,
    "lead" TEXT,
    "language" "Lang" NOT NULL DEFAULT 'EN',
    "status" "Status" NOT NULL DEFAULT 'drafted',

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graphic" (
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

    CONSTRAINT "graphic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
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

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_featureImageUrl_fkey" FOREIGN KEY ("featureImageUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graphic" ADD CONSTRAINT "graphic_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "graphic" ADD CONSTRAINT "graphic_graphicsUrl_fkey" FOREIGN KEY ("graphicsUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
