-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_shipId_fkey";

-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_turnId_fkey";

-- DropForeignKey
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_userId_fkey";

-- DropForeignKey
ALTER TABLE "Turn" DROP CONSTRAINT "Turn_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
