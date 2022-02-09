/*
  Warnings:

  - Added the required column `title` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "title" TEXT NOT NULL;
