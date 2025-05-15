/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Certificate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseTitle` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "courseTitle" TEXT NOT NULL,
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_hash_key" ON "Certificate"("hash");
