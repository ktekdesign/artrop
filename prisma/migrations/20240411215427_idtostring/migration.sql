/*
  Warnings:

  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Operation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Ship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Turn` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_turnId_fkey";

-- DropForeignKey
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Customer_id_seq";

-- AlterTable
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "turnId" SET DATA TYPE TEXT,
ALTER COLUMN "shipId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Operation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Operation_id_seq";

-- AlterTable
ALTER TABLE "Ship" DROP CONSTRAINT "Ship_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ship_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ship_id_seq";

-- AlterTable
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vehicleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Turn_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Turn_id_seq";

-- AlterTable
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vehicle_id_seq";

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
