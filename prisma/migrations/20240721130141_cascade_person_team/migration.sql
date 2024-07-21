-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_teamId_fkey";

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
