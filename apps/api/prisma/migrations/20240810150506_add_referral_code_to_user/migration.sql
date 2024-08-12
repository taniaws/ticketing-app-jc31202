/*
  Warnings:

  - You are about to drop the column `referral_code` on the `discount` table. All the data in the column will be lost.
  - Added the required column `referral_code` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` DROP COLUMN `referral_code`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `referral_code` VARCHAR(191) NOT NULL;
