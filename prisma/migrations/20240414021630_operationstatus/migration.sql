/*
  Warnings:

  - You are about to drop the column `start_travel` on the `Operation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INICO_VIAGEM', 'INICIO_CARREGAMENTO', 'FIM_CARREGAMENTO', 'CHEGADA_BALANCA_CARREGADO', 'SAIDA_BALANCA_CARREGADO', 'INICIO_DESCARREGAMENTO', 'FIM_DESCARREGAMENTO', 'CHEGADA_BALANCA_VAZIO', 'SAIDA_BALANCA_VAZIO', 'INICIO_TRAVA_CONTAINER', 'FIM_TRAVA_CONTAINER', 'FIM_VIAGEM');

-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "start_travel",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'INICO_VIAGEM';
