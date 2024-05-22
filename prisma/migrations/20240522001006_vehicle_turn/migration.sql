/*
  Warnings:

  - You are about to drop the column `endedKm` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `startedKm` on the `Turn` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Turn" DROP COLUMN "endedKm",
DROP COLUMN "startedKm";

-- AlterTable
ALTER TABLE "VehiclesTurn" ADD COLUMN     "endedKm" INTEGER DEFAULT 0,
ADD COLUMN     "startedKm" INTEGER NOT NULL DEFAULT 0;
