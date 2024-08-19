/*
  Warnings:

  - Added the required column `user_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `referral_code` VARCHAR(191) NULL;
