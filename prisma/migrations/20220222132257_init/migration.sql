-- CreateTable
CREATE TABLE "Letter" (
    "id" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" VARCHAR(300) NOT NULL,

    CONSTRAINT "Letter_pkey" PRIMARY KEY ("id")
);
