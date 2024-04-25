/*
  Warnings:

  - You are about to drop the column `endAt` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `Travel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "endAt",
ADD COLUMN     "endedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "endAt",
ADD COLUMN     "endedAt" TIMESTAMP(3);
