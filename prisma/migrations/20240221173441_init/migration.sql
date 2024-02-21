/*
  Warnings:

  - You are about to drop the column `company` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `employee` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId,name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPLOYEE', 'USER');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('COMPLETE', 'AVAILABLE', 'PENDING');

-- CreateEnum
CREATE TYPE "Interval" AS ENUM ('MONTH');

-- DropIndex
DROP INDEX "Account_company_name_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "company",
DROP COLUMN "employee",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emailDomain" TEXT,
    "contactEmail" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySteps" (
    "stepId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "status" "StepStatus" NOT NULL DEFAULT 'PENDING'
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minimum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" TIMESTAMP(3),
    "basFee" INTEGER NOT NULL DEFAULT 0,
    "interval" "Interval" NOT NULL DEFAULT 'MONTH',

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "performanceFee" INTEGER NOT NULL DEFAULT 0,
    "saturated" BOOLEAN NOT NULL,
    "image" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionServices" (
    "serviceId" INTEGER NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Painpoint" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Painpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToMeeting" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CompanyToPainpoint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PainpointToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_emailDomain_key" ON "Company"("emailDomain");

-- CreateIndex
CREATE UNIQUE INDEX "Company_contactEmail_key" ON "Company"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Company_stripeId_key" ON "Company"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySteps_stepId_companyId_key" ON "CompanySteps"("stepId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_label_key" ON "Service"("label");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionServices_serviceId_subscriptionId_key" ON "SubscriptionServices"("serviceId", "subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Painpoint_label_key" ON "Painpoint"("label");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToMeeting_AB_unique" ON "_AccountToMeeting"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToMeeting_B_index" ON "_AccountToMeeting"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToPainpoint_AB_unique" ON "_CompanyToPainpoint"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToPainpoint_B_index" ON "_CompanyToPainpoint"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PainpointToService_AB_unique" ON "_PainpointToService"("A", "B");

-- CreateIndex
CREATE INDEX "_PainpointToService_B_index" ON "_PainpointToService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyId_name_key" ON "Account"("companyId", "name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySteps" ADD CONSTRAINT "CompanySteps_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySteps" ADD CONSTRAINT "CompanySteps_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionServices" ADD CONSTRAINT "SubscriptionServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionServices" ADD CONSTRAINT "SubscriptionServices_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionServices" ADD CONSTRAINT "SubscriptionServices_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToMeeting" ADD CONSTRAINT "_AccountToMeeting_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToMeeting" ADD CONSTRAINT "_AccountToMeeting_B_fkey" FOREIGN KEY ("B") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToPainpoint" ADD CONSTRAINT "_CompanyToPainpoint_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToPainpoint" ADD CONSTRAINT "_CompanyToPainpoint_B_fkey" FOREIGN KEY ("B") REFERENCES "Painpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PainpointToService" ADD CONSTRAINT "_PainpointToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Painpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PainpointToService" ADD CONSTRAINT "_PainpointToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
