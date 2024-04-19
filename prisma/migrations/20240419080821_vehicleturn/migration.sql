/*
  Warnings:

  - You are about to alter the column `phone` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `govID` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(14)`.
  - You are about to drop the column `vehicleId` on the `Turn` table. All the data in the column will be lost.
  - You are about to alter the column `phone` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `govID` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.

*/
-- DropForeignKey
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13),
ALTER COLUMN "govID" SET DATA TYPE VARCHAR(14);

-- AlterTable
ALTER TABLE "Turn" DROP COLUMN "vehicleId";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13),
ALTER COLUMN "govID" SET DATA TYPE VARCHAR(11);

-- CreateTable
CREATE TABLE "VehiclesTurn" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "turnId" TEXT NOT NULL,

    CONSTRAINT "VehiclesTurn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehiclesTurn" ADD CONSTRAINT "VehiclesTurn_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehiclesTurn" ADD CONSTRAINT "VehiclesTurn_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
