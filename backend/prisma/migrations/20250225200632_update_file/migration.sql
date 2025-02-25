/*
  Warnings:

  - You are about to alter the column `name` on the `File` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - Added the required column `type` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" VARCHAR(30) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);
