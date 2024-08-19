/*
  Warnings:

  - You are about to drop the column `price` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `discount` table. All the data in the column will be lost.
  - Added the required column `datecreate` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateexpire` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percent` to the `discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` DROP COLUMN `price`,
    DROP COLUMN `tanggal`,
    ADD COLUMN `datecreate` DATE NOT NULL,
    ADD COLUMN `dateexpire` DATE NOT NULL,
    ADD COLUMN `isdeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `percent` INTEGER NOT NULL;
