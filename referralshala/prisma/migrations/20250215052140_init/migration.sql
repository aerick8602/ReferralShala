/*
  Warnings:

  - The `resume` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "resume",
ADD COLUMN     "resume" JSONB;

-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "social_links" JSONB;
