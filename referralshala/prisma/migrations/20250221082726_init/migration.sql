/*
  Warnings:

  - You are about to drop the column `candidateId` on the `Application` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,referralId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_candidateId_fkey";

-- DropIndex
DROP INDEX "Application_candidateId_referralId_key";

-- DropIndex
DROP INDEX "idx_application_candidateId";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "candidateId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "idx_application_userId" ON "Application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_referralId_key" ON "Application"("userId", "referralId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
