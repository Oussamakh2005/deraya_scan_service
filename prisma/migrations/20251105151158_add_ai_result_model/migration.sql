/*
  Warnings:

  - Added the required column `aiDetection` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Ai_Detection" AS ENUM ('POSITIVE', 'NEGATIVE', 'UNCERTAIN');

-- CreateEnum
CREATE TYPE "TumorType" AS ENUM ('BENIGN', 'MALIGNANT', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Scan" ADD COLUMN     "aiDetection" "Ai_Detection" NOT NULL;

-- CreateTable
CREATE TABLE "Results" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "aiDetection" "Ai_Detection" NOT NULL,
    "tumorType" "TumorType" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "modelVersion" TEXT NOT NULL DEFAULT '1.0.0',
    "doctorReview" TEXT,
    "reviewedBy" TEXT NOT NULL,
    "scanId" TEXT NOT NULL,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "Scan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
