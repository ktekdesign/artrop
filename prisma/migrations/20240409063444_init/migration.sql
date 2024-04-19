/*
  Warnings:

  - You are about to drop the column `cnpf` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `representant` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `operation` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[govID]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[govID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `govID` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `govID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Customer_cnpf_key";

-- DropIndex
DROP INDEX "User_cpf_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "cnpf",
DROP COLUMN "representant",
ADD COLUMN     "govID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cpf",
DROP COLUMN "operation",
ADD COLUMN     "govID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_govID_key" ON "Customer"("govID");

-- CreateIndex
CREATE UNIQUE INDEX "User_govID_key" ON "User"("govID");
