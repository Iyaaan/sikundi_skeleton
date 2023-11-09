-- CreateEnum
CREATE TYPE "Lang" AS ENUM ('EN', 'DV');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "language" "Lang" NOT NULL DEFAULT 'EN';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "language" "Lang" NOT NULL DEFAULT 'EN';
