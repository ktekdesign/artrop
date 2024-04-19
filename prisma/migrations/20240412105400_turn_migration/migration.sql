/*
  Warnings:

  - You are about to drop the column `endAt` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `endKm` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `startKm` on the `Turn` table. All the data in the column will be lost.
  - Added the required column `startedKm` to the `Turn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Turn" DROP COLUMN "endAt",
DROP COLUMN "endKm",
DROP COLUMN "startKm",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "endedKm" INTEGER,
ADD COLUMN     "startedKm" INTEGER NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ALTER COLUMN "customerId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
