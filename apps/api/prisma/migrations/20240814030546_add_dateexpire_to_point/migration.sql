/*
  Warnings:

  - Added the required column `dateexpire` to the `point` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `point` ADD COLUMN `dateexpire` DATE NOT NULL;
