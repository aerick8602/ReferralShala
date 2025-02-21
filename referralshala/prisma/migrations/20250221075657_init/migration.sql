-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "Id" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'candidate',
    "userData" JSONB,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "candidateId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "skills" TEXT[],
    "social_links" JSONB,
    "resume" JSONB,
    "contact_number" VARCHAR(15),
    "location" VARCHAR(255),
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("candidateId")
);

-- CreateTable
CREATE TABLE "Employer" (
    "employerId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(255),
    "job_role" VARCHAR(255),
    "location" VARCHAR(255),
    "contact_number" VARCHAR(15),
    "social_links" JSONB,
    "createdAt" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Employer_pkey" PRIMARY KEY ("employerId")
);

-- CreateTable
CREATE TABLE "Education" (
    "educationId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "institute_name" VARCHAR(255) NOT NULL,
    "degree" VARCHAR(255) NOT NULL,
    "stream" VARCHAR(255) NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "is_currently_educating" BOOLEAN NOT NULL DEFAULT false,
    "grade" JSON NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("educationId")
);

-- CreateTable
CREATE TABLE "Experience" (
    "experienceId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "location" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "is_currently_employed" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("experienceId")
);

-- CreateTable
CREATE TABLE "Referral" (
    "referralId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "job_category" TEXT NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "job_description" TEXT,
    "job_link" TEXT,
    "location" VARCHAR(255),
    "experience_required" INTEGER,
    "application_count" INTEGER NOT NULL DEFAULT 0,
    "postedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(0),

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("referralId")
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationId" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "referralId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "appliedAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Id_key" ON "User"("Id");

-- CreateIndex
CREATE INDEX "idx_user_id" ON "User"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_user_id_key" ON "Candidate"("user_id");

-- CreateIndex
CREATE INDEX "idx_candidate_userId" ON "Candidate"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Employer_user_id_key" ON "Employer"("user_id");

-- CreateIndex
CREATE INDEX "idx_employer_userId" ON "Employer"("user_id");

-- CreateIndex
CREATE INDEX "idx_education_userId" ON "Education"("user_id");

-- CreateIndex
CREATE INDEX "idx_experience_userId" ON "Experience"("user_id");

-- CreateIndex
CREATE INDEX "idx_company_name" ON "Referral"("company_name");

-- CreateIndex
CREATE INDEX "idx_job_title" ON "Referral"("job_title");

-- CreateIndex
CREATE INDEX "idx_referral_userId" ON "Referral"("user_id");

-- CreateIndex
CREATE INDEX "idx_application_candidateId" ON "Application"("candidateId");

-- CreateIndex
CREATE INDEX "idx_application_referralId" ON "Application"("referralId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_candidateId_referralId_key" ON "Application"("candidateId", "referralId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employer" ADD CONSTRAINT "Employer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("candidateId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("referralId") ON DELETE CASCADE ON UPDATE CASCADE;
