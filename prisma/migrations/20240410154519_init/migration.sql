/*
  Warnings:

  - The values [VIRINHA_PRACA] on the enum `OperationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OperationType_new" AS ENUM ('VIRINHA_CACAMBA', 'VIRINHA_PRANCHA', 'VIRINHA_CONTAINER', 'ENTRE_ARMAZENS');
ALTER TABLE "Customer" ALTER COLUMN "operation" TYPE "OperationType_new"[] USING ("operation"::text::"OperationType_new"[]);
ALTER TABLE "Operation" ALTER COLUMN "type" TYPE "OperationType_new" USING ("type"::text::"OperationType_new");
ALTER TYPE "OperationType" RENAME TO "OperationType_old";
ALTER TYPE "OperationType_new" RENAME TO "OperationType";
DROP TYPE "OperationType_old";
COMMIT;
