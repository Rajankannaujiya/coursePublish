/*
  Warnings:

  - You are about to drop the column `courseTitle` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `hash` on the `Certificate` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `Certificate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Certificate_hash_key";

-- AlterTable
ALTER TABLE "Certificate" DROP COLUMN "courseTitle",
DROP COLUMN "hash",
DROP COLUMN "userName";
