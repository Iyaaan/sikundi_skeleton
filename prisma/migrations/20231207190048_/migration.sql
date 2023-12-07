/*
  Warnings:

  - Added the required column `adType` to the `AdBanner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdTypes" AS ENUM ('t_banner', 'ss_banner', 'ess_banner', 'ls_banner', 'ml_banner', 'msl_banner', 'ia_banner', 'ae_banner');

-- AlterTable
ALTER TABLE "AdBanner" ADD COLUMN     "adType" "AdTypes" NOT NULL;
