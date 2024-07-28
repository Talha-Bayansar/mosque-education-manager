-- CreateTable
CREATE TABLE "PosterTemplate" (
    "id" TEXT NOT NULL,
    "utKey" TEXT NOT NULL,
    "utUrl" TEXT NOT NULL,
    "utName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT,

    CONSTRAINT "PosterTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PosterTemplate_utKey_key" ON "PosterTemplate"("utKey");

-- CreateIndex
CREATE UNIQUE INDEX "PosterTemplate_utUrl_key" ON "PosterTemplate"("utUrl");

-- AddForeignKey
ALTER TABLE "PosterTemplate" ADD CONSTRAINT "PosterTemplate_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
