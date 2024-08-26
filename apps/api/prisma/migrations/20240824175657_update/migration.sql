/*
  Warnings:

  - You are about to drop the column `discountId` on the `detailtransaction` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `detailtransaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketcode]` on the table `detailtransaction` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionCode]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketcode` to the `detailtransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionCode` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detailtransaction` DROP FOREIGN KEY `Detail_Transaction_fk2`;

-- DropForeignKey
ALTER TABLE `detailtransaction` DROP FOREIGN KEY `detailTransaction_eventId_fkey`;

-- AlterTable
ALTER TABLE `detailtransaction` DROP COLUMN `discountId`,
    DROP COLUMN `eventId`,
    ADD COLUMN `isAttendance` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ticketcode` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `harga` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `discountId` INTEGER NULL,
    ADD COLUMN `pointsUsed` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `transactionCode` VARCHAR(45) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ticketcode_UNIQUE` ON `detailtransaction`(`ticketcode`);

-- CreateIndex
CREATE UNIQUE INDEX `transactionCode_UNIQUE` ON `transaction`(`transactionCode`);

-- CreateIndex
CREATE INDEX `Transaction_fk3_idx` ON `transaction`(`discountId`);

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_fk3` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
