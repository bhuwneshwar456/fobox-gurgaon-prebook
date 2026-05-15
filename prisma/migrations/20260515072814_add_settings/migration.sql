-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "whatsappGroupUrl" TEXT NOT NULL DEFAULT 'https://wa.me/919999999999',
    "counterSeed" INTEGER NOT NULL DEFAULT 347,
    "totalSpots" INTEGER NOT NULL DEFAULT 500,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
