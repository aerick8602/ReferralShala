/*
  Warnings:

  - The primary key for the `Candidate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CandidateId` on the `Candidate` table. All the data in the column will be lost.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EducationId` on the `Education` table. All the data in the column will be lost.
  - The primary key for the `Employer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EmployerId` on the `Employer` table. All the data in the column will be lost.
  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ExperienceId` on the `Experience` table. All the data in the column will be lost.
  - The primary key for the `Referral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ReferralId` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_employer_id_fkey";

-- DropIndex
DROP INDEX "User_ID_key";

-- AlterTable
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_pkey",
DROP COLUMN "CandidateId",
ADD COLUMN     "candidateId" SERIAL NOT NULL,
ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY ("candidateId");

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
DROP COLUMN "EducationId",
ADD COLUMN     "educationId" SERIAL NOT NULL,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("educationId");

-- AlterTable
ALTER TABLE "Employer" DROP CONSTRAINT "Employer_pkey",
DROP COLUMN "EmployerId",
ADD COLUMN     "employerId" SERIAL NOT NULL,
ADD CONSTRAINT "Employer_pkey" PRIMARY KEY ("employerId");

-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
DROP COLUMN "ExperienceId",
ADD COLUMN     "experienceId" SERIAL NOT NULL,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("experienceId");

-- AlterTable
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_pkey",
DROP COLUMN "ReferralId",
ADD COLUMN     "referralId" SERIAL NOT NULL,
ADD CONSTRAINT "Referral_pkey" PRIMARY KEY ("referralId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ID",
ADD COLUMN     "Id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "Employer"("employerId") ON DELETE CASCADE ON UPDATE CASCADE;
