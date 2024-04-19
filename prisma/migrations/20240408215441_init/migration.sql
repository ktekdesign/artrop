-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STAFF', 'DRIVER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('RESIDENCE', 'COMERCIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('VIRINHA_CACAMBA', 'VIRINHA_PRACA', 'VIRINHA_CONTAINER', 'ENTRE_ARMAZENS');

-- CreateEnum
CREATE TYPE "Truck" AS ENUM ('TRUC', 'TOCO', 'CAVALO_4X2', 'CAVALO_6X2', 'CAVALO_6X4');

-- CreateEnum
CREATE TYPE "Bodytruck" AS ENUM ('VIRINHA_CACAMBA', 'PORTA_CONTAINER', 'PRANCHA', 'GRANELEIRO', 'GRADE_BAIXA', 'SIDER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "operation" "OperationType"[],
    "info" JSONB,
    "type" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "representant" TEXT NOT NULL,
    "cnpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "operation" "OperationType"[],
    "info" JSONB,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "line_up" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "landingAt" TIMESTAMP(3) NOT NULL,
    "departAt" TIMESTAMP(3),

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "licence_plate_1" TEXT NOT NULL,
    "licence_plate_2" TEXT,
    "licence_plate_3" TEXT,
    "capacity" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "truck" "Truck" NOT NULL,
    "bodytruck" "Bodytruck" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turn" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3),
    "startKm" INTEGER NOT NULL,
    "endKm" INTEGER,
    "customerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Turn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(3),
    "type" "OperationType" NOT NULL,
    "start_travel" TIMESTAMP(3),
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
    "turnId" INTEGER NOT NULL,
    "shipId" INTEGER NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_cnpf_key" ON "Customer"("cnpf");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licence_plate_1_key" ON "Vehicle"("licence_plate_1");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turn" ADD CONSTRAINT "Turn_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
