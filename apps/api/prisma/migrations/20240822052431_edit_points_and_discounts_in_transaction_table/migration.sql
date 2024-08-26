/*
  Warnings:

  - Added the required column `harga` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `harga` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `pointsUsed` INTEGER NOT NULL DEFAULT 0,
    MODIFY `discountId` INTEGER NULL;
