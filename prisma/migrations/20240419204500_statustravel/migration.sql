/*
  Warnings:

  - The values [INICO_VIAGEM] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('INICIO_VIAGEM', 'INICIO_CARREGAMENTO', 'FIM_CARREGAMENTO', 'CHEGADA_BALANCA_CARREGADO', 'SAIDA_BALANCA_CARREGADO', 'INICIO_DESCARREGAMENTO', 'FIM_DESCARREGAMENTO', 'CHEGADA_BALANCA_VAZIO', 'SAIDA_BALANCA_VAZIO', 'INICIO_TRAVA_CONTAINER', 'FIM_TRAVA_CONTAINER', 'FIM_VIAGEM');
ALTER TABLE "Travel" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Travel" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Travel" ALTER COLUMN "status" SET DEFAULT 'INICIO_VIAGEM';
COMMIT;

-- AlterTable
ALTER TABLE "Travel" ALTER COLUMN "status" SET DEFAULT 'INICIO_VIAGEM';
