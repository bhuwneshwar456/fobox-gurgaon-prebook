-- CreateTable
CREATE TABLE "PreBooking" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "dietType" TEXT,
    "allergies" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 99,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "paidAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "whatsappJoined" BOOLEAN NOT NULL DEFAULT false,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "lastEmailAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "referrer" TEXT,

    CONSTRAINT "PreBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "totalSpots" INTEGER NOT NULL DEFAULT 500,
    "spotsTaken" INTEGER NOT NULL DEFAULT 347,
    "seed" INTEGER NOT NULL DEFAULT 347,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreBooking_razorpayOrderId_key" ON "PreBooking"("razorpayOrderId");

-- CreateIndex
CREATE INDEX "PreBooking_phone_idx" ON "PreBooking"("phone");

-- CreateIndex
CREATE INDEX "PreBooking_status_idx" ON "PreBooking"("status");

-- CreateIndex
CREATE INDEX "PreBooking_plan_idx" ON "PreBooking"("plan");
