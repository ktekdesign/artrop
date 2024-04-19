/*
  Warnings:

  - The values [Caçamba,Porta Container,Prancha,Graneleiro,Grade Baixa,Sider] on the enum `Bodytruck` will be removed. If these variants are still used in the database, this will fail.
  - The values [Caçamba,Pancha,Container,Entre Armazéns] on the enum `OperationType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Admin,Staff,Motorista] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [Truck,Toco,Cavalo 4x2,Cavalo 6x2,Cavalo 6x4] on the enum `Truck` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('RESIDENCE', 'COMERCIAL', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "Bodytruck_new" AS ENUM ('VIRINHA_CACAMBA', 'PORTA_CONTAINER', 'PRANCHA', 'GRANELEIRO', 'GRADE_BAIXA', 'SIDER');
ALTER TABLE "Vehicle" ALTER COLUMN "bodytruck" TYPE "Bodytruck_new" USING ("bodytruck"::text::"Bodytruck_new");
ALTER TYPE "Bodytruck" RENAME TO "Bodytruck_old";
ALTER TYPE "Bodytruck_new" RENAME TO "Bodytruck";
DROP TYPE "Bodytruck_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OperationType_new" AS ENUM ('VIRINHA_CACAMBA', 'VIRINHA_PRANCHA', 'VIRINHA_CONTAINER', 'ENTRE_ARMAZENS');
ALTER TABLE "Customer" ALTER COLUMN "operation" TYPE "OperationType_new"[] USING ("operation"::text::"OperationType_new"[]);
ALTER TABLE "Operation" ALTER COLUMN "type" TYPE "OperationType_new" USING ("type"::text::"OperationType_new");
ALTER TYPE "OperationType" RENAME TO "OperationType_old";
ALTER TYPE "OperationType_new" RENAME TO "OperationType";
DROP TYPE "OperationType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'STAFF', 'DRIVER');
ALTER TABLE "User" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "type" TYPE "Role_new" USING ("type"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "type" SET DEFAULT 'DRIVER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Truck_new" AS ENUM ('TRUC', 'TOCO', 'CAVALO_4X2', 'CAVALO_6X2', 'CAVALO_6X4');
ALTER TABLE "Vehicle" ALTER COLUMN "truck" TYPE "Truck_new" USING ("truck"::text::"Truck_new");
ALTER TYPE "Truck" RENAME TO "Truck_old";
ALTER TYPE "Truck_new" RENAME TO "Truck";
DROP TYPE "Truck_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "type" SET DEFAULT 'DRIVER';
