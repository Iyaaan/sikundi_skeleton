/*
  Warnings:

  - Changed the type of `action` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `action` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Action" AS ENUM ('draft', 'publish', 'soft_delete', 'delete', 'create', 'update');

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "action",
ADD COLUMN     "action" "Action" NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "action",
ADD COLUMN     "action" "Action" NOT NULL;

-- DropEnum
DROP TYPE "CrudAction";
