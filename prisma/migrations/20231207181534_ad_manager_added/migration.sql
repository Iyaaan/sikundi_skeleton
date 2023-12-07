-- CreateTable
CREATE TABLE "AdBanner" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" INTEGER,
    "adBannerUrl" TEXT,
    "altTxt" TEXT NOT NULL,
    "url" TEXT,
    "language" "Lang" NOT NULL DEFAULT 'EN',
    "status" "Status" NOT NULL DEFAULT 'drafted',

    CONSTRAINT "AdBanner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdBanner" ADD CONSTRAINT "AdBanner_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdBanner" ADD CONSTRAINT "AdBanner_adBannerUrl_fkey" FOREIGN KEY ("adBannerUrl") REFERENCES "Media"("url") ON DELETE SET NULL ON UPDATE CASCADE;
