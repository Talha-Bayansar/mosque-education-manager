-- CreateTable
CREATE TABLE "_GroupToMeetup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToMeetup_AB_unique" ON "_GroupToMeetup"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToMeetup_B_index" ON "_GroupToMeetup"("B");

-- AddForeignKey
ALTER TABLE "_GroupToMeetup" ADD CONSTRAINT "_GroupToMeetup_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToMeetup" ADD CONSTRAINT "_GroupToMeetup_B_fkey" FOREIGN KEY ("B") REFERENCES "Meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
