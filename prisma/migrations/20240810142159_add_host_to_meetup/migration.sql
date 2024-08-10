-- AlterTable
ALTER TABLE "Meetup" ADD COLUMN     "hostId" TEXT;

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;
