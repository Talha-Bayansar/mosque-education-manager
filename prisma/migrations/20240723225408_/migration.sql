/*
  Warnings:

  - You are about to drop the `_GroupToMeetup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToMeetup" DROP CONSTRAINT "_GroupToMeetup_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToMeetup" DROP CONSTRAINT "_GroupToMeetup_B_fkey";

-- AlterTable
ALTER TABLE "Meetup" ADD COLUMN     "groupId" TEXT;

-- DropTable
DROP TABLE "_GroupToMeetup";

-- AddForeignKey
ALTER TABLE "Meetup" ADD CONSTRAINT "Meetup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
