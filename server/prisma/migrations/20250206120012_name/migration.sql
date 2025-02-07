-- CreateTable
CREATE TABLE "User" (
    "_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT DEFAULT '',
    "surname" TEXT DEFAULT '',
    "club" TEXT DEFAULT '',
    "city" TEXT DEFAULT '',
    "country" TEXT DEFAULT '',
    "image" TEXT,
    "permissions" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "_id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "reciept" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "discipline" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "contry" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "transactionId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Prices" (
    "_id" SERIAL NOT NULL,
    "place" TEXT NOT NULL,
    "Amount" INTEGER NOT NULL,
    "eventId" INTEGER,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Image" (
    "_id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "eventId" INTEGER,
    "playerId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Team" (
    "_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "club" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "coathName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "sname" TEXT NOT NULL,
    "transactionId" INTEGER,
    "eventId" INTEGER,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Player" (
    "_id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "surName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateBirth" TEXT NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
