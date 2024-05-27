/*
  Warnings:

  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Images" DROP CONSTRAINT "Images_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Images_pkey" PRIMARY KEY ("id");
