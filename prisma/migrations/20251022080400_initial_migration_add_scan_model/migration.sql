-- CreateTable
CREATE TABLE "Scan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT,
    "imageUrl" TEXT NOT NULL,
    "institutionId" TEXT NOT NULL,

    CONSTRAINT "Scan_pkey" PRIMARY KEY ("id")
);
