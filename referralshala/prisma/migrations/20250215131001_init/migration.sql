-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "resume" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userType" SET DEFAULT 'candidate';
