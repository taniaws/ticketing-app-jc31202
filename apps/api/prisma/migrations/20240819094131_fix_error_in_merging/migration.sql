/*
  Warnings:

  - You are about to drop the column `categoriname` on the `categori` table. All the data in the column will be lost.
  - You are about to drop the column `datecreate` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `dateexpire` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `discount` table. All the data in the column will be lost.
  - You are about to drop the column `categori_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi_event` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `nama_event` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal_event` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `feedback` table. All the data in the column will be lost.
  - You are about to drop the column `location_name` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `datecreate` on the `point` table. All the data in the column will be lost.
  - You are about to drop the column `dateexpire` on the `point` table. All the data in the column will be lost.
  - You are about to drop the column `isdeleted` on the `point` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `point` table. All the data in the column will be lost.
  - You are about to drop the column `detail_transaction_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `notelp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referral_code` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `detail_transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoriName` to the `categori` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateCreate` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateExpire` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsiEvent` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaEvent` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalEvent` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Made the column `imgEvent` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `eventId` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationName` to the `location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateCreate` to the `point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateExpire` to the `point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `point` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `createdAt` on the `transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `noTelp` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detail_transaction` DROP FOREIGN KEY `Detail_Transaction_fk1`;

-- DropForeignKey
ALTER TABLE `detail_transaction` DROP FOREIGN KEY `Detail_Transaction_fk2`;

-- DropForeignKey
ALTER TABLE `discount` DROP FOREIGN KEY `Discount_fk1`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_fk11`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_fk3`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_fk5`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_fk7`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_fk1`;

-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_fk2`;

-- DropForeignKey
ALTER TABLE `point` DROP FOREIGN KEY `Point_fk1`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_fk1`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_fk4`;

-- DropIndex
DROP INDEX `user_referral_code_key` ON `user`;

-- AlterTable
ALTER TABLE `categori` DROP COLUMN `categoriname`,
    ADD COLUMN `categoriName` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `discount` DROP COLUMN `datecreate`,
    DROP COLUMN `dateexpire`,
    DROP COLUMN `isdeleted`,
    DROP COLUMN `user_id`,
    ADD COLUMN `dateCreate` DATE NOT NULL,
    ADD COLUMN `dateExpire` DATE NOT NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `categori_id`,
    DROP COLUMN `deskripsi_event`,
    DROP COLUMN `location_id`,
    DROP COLUMN `nama_event`,
    DROP COLUMN `status_id`,
    DROP COLUMN `tanggal_event`,
    DROP COLUMN `type_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `categoriId` INTEGER NOT NULL,
    ADD COLUMN `deskripsiEvent` VARCHAR(255) NOT NULL,
    ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `namaEvent` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('COMING_SOON', 'ONGOING', 'COMPLETED') NOT NULL,
    ADD COLUMN `tanggalEvent` DATE NOT NULL,
    ADD COLUMN `type` ENUM('FREE', 'PAID') NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `imgEvent` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `feedback` DROP COLUMN `event_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `location` DROP COLUMN `location_name`,
    ADD COLUMN `locationName` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `point` DROP COLUMN `datecreate`,
    DROP COLUMN `dateexpire`,
    DROP COLUMN `isdeleted`,
    DROP COLUMN `user_id`,
    ADD COLUMN `dateCreate` DATE NOT NULL,
    ADD COLUMN `dateExpire` DATE NOT NULL,
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `detail_transaction_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    DROP COLUMN `createdAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `notelp`,
    DROP COLUMN `referral_code`,
    ADD COLUMN `noTelp` VARCHAR(255) NOT NULL,
    ADD COLUMN `referralCode` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `detail_transaction`;

-- DropTable
DROP TABLE `status`;

-- DropTable
DROP TABLE `type`;

-- CreateTable
CREATE TABLE `detailTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discountId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `eventId` INTEGER NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `Detail_Transaction_fk2`(`discountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Discount_fk1` ON `discount`(`userId`);

-- CreateIndex
CREATE INDEX `Event_fk1` ON `event`(`userId`);

-- CreateIndex
CREATE INDEX `Event_fk3` ON `event`(`locationId`);

-- CreateIndex
CREATE INDEX `Event_fk7_idx` ON `event`(`categoriId`);

-- CreateIndex
CREATE INDEX `Feedback_fk1` ON `feedback`(`eventId`);

-- CreateIndex
CREATE INDEX `Feedback_fk2` ON `feedback`(`userId`);

-- CreateIndex
CREATE INDEX `Point_fk1` ON `point`(`userId`);

-- CreateIndex
CREATE INDEX `Transaction_fk1` ON `transaction`(`userId`);

-- CreateIndex
CREATE INDEX `Transaction_fk2` ON `transaction`(`eventId`);

-- CreateIndex
CREATE UNIQUE INDEX `user_referralCode_key` ON `user`(`referralCode`);

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `Point_fk1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `discount` ADD CONSTRAINT `Discount_fk1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `Feedback_fk1` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `Feedback_fk2` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk3` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk7` FOREIGN KEY (`categoriId`) REFERENCES `categori`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_fk1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_fk2` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detailTransaction` ADD CONSTRAINT `Detail_Transaction_fk2` FOREIGN KEY (`discountId`) REFERENCES `discount`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detailTransaction` ADD CONSTRAINT `detailTransaction_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailTransaction` ADD CONSTRAINT `detailTransaction_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
