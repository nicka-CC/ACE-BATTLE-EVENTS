-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "location1" TEXT,
ADD COLUMN     "location2" TEXT,
ADD COLUMN     "location3" TEXT,
ADD COLUMN     "location4" TEXT;

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "Races" (
    "_id" SERIAL NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "place" INTEGER NOT NULL,
    "Race" TEXT NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "Races_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Races" ADD CONSTRAINT "Races_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
