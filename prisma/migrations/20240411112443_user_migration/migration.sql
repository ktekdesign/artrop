/*
  Warnings:

  - You are about to drop the column `info` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `vehicleId` to the `Turn` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_userId_fkey";

-- AlterTable
ALTER TABLE "Turn" ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "info",
ADD COLUMN     "address" JSONB,
ADD COLUMN     "cnh" JSONB,
ADD COLUMN     "cnh_expires" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
