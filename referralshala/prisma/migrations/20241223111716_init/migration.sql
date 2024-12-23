/*
  Warnings:

  - Added the required column `company_name` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" ADD COLUMN     "company_name" VARCHAR(255) NOT NULL;
