/*
  Warnings:

  - A unique constraint covering the columns `[turnId,vehicleId]` on the table `VehiclesTurn` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "VehiclesTurn" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VehiclesTurn_turnId_vehicleId_key" ON "VehiclesTurn"("turnId", "vehicleId");

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
