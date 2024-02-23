-- AlterTable
ALTER TABLE "CompanySteps" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CompanySteps_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubscriptionServices" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SubscriptionServices_pkey" PRIMARY KEY ("id");
