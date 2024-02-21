/*
  Warnings:

  - A unique constraint covering the columns `[company,name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_company_name_key" ON "Account"("company", "name");
