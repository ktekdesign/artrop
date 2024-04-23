/*
  Warnings:

  - You are about to drop the column `end_balance_loaded` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `end_balance_unloaded` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `end_block_container` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `end_load` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `end_unload` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `start_balance_loaded` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `start_balance_unloaded` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `start_block_container` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `start_load` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `start_unload` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Operation` table. All the data in the column will be lost.
  - The `status` column on the `Operation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "end_balance_loaded",
DROP COLUMN "end_balance_unloaded",
DROP COLUMN "end_block_container",
DROP COLUMN "end_load",
DROP COLUMN "end_unload",
DROP COLUMN "start_balance_loaded",
DROP COLUMN "start_balance_unloaded",
DROP COLUMN "start_block_container",
DROP COLUMN "start_load",
DROP COLUMN "start_unload",
DROP COLUMN "weight",
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3),
    "start_load" TIMESTAMP(3),
    "end_load" TIMESTAMP(3),
    "start_balance_loaded" TIMESTAMP(3),
    "end_balance_loaded" TIMESTAMP(3),
    "start_unload" TIMESTAMP(3),
    "end_unload" TIMESTAMP(3),
    "start_balance_unloaded" TIMESTAMP(3),
    "end_balance_unloaded" TIMESTAMP(3),
    "start_block_container" TIMESTAMP(3),
    "end_block_container" TIMESTAMP(3),
    "weight" DOUBLE PRECISION,
    "status" "Status" NOT NULL DEFAULT 'INICO_VIAGEM',
    "operationId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
