-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "contact_number" VARCHAR(15),
ADD COLUMN     "location" VARCHAR(255);

-- AlterTable
ALTER TABLE "Employer" ADD COLUMN     "contact_number" VARCHAR(15);
