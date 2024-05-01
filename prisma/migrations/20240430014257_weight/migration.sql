/*
  Warnings:

  - You are about to drop the column `weight` on the `Travel` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'PESO_CARREGADO';
ALTER TYPE "Status" ADD VALUE 'PESO_DESCARREGADO';

-- AlterTable
ALTER TABLE "Travel" DROP COLUMN "weight",
ADD COLUMN     "weight_load" DOUBLE PRECISION,
ADD COLUMN     "weight_unload" DOUBLE PRECISION;
