/*
  Warnings:

  - The `stories` column on the `Story` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "stories",
ADD COLUMN     "stories" TEXT[];
