/*
  Warnings:

  - You are about to drop the column `accountId` on the `SentEmail` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `SentEmail` table. All the data in the column will be lost.
  - You are about to drop the column `prospectId` on the `SentEmail` table. All the data in the column will be lost.
  - Added the required column `email` to the `SentEmail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SentEmail" DROP CONSTRAINT "SentEmail_accountId_fkey";

-- DropForeignKey
ALTER TABLE "SentEmail" DROP CONSTRAINT "SentEmail_companyId_fkey";

-- DropForeignKey
ALTER TABLE "SentEmail" DROP CONSTRAINT "SentEmail_prospectId_fkey";

-- AlterTable
ALTER TABLE "SentEmail" DROP COLUMN "accountId",
DROP COLUMN "companyId",
DROP COLUMN "prospectId",
ADD COLUMN     "email" TEXT NOT NULL;
