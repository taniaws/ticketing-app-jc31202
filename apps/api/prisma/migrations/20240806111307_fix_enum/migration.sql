/*
  Warnings:

  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `samples`;

-- CreateTable
CREATE TABLE `detail_transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `discount_id` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `Detail_Transaction_fk1`(`event_id`),
    INDEX `Detail_Transaction_fk2`(`discount_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `referral_code` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `tanggal` DATE NOT NULL,
    `price` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_event` VARCHAR(255) NOT NULL,
    `tanggal_event` DATE NOT NULL,
    `location_id` INTEGER NOT NULL,
    `jam_event` TIME(0) NOT NULL,
    `type_id` INTEGER NOT NULL,
    `deskripsi_event` VARCHAR(255) NOT NULL,
    `status` ENUM('UPCOMING', 'ONGOING', 'COMPLETED') NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `Event_fk3`(`location_id`),
    INDEX `Event_fk5`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `feedback` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `Feedback_fk1`(`event_id`),
    INDEX `Feedback_fk2`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `datecreate` DATE NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `Point_fk1`(`user_id`),
    INDEX `Point_fk2`(`event_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` ENUM('CUSTOMER', 'ADMIN') NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` INTEGER NOT NULL,
    `detail_transaction_id` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `Transaction_fk1`(`user_id`),
    INDEX `Transaction_fk4`(`detail_transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` ENUM('FREE', 'PAID') NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `notelp` VARCHAR(255) NOT NULL,
    `role_id` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `User_fk5`(`role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_transaction` ADD CONSTRAINT `Detail_Transaction_fk1` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detail_transaction` ADD CONSTRAINT `Detail_Transaction_fk2` FOREIGN KEY (`discount_id`) REFERENCES `discount`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk3` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk5` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `Feedback_fk1` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `Feedback_fk2` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `Point_fk1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `point` ADD CONSTRAINT `Point_fk2` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_fk1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `Transaction_fk4` FOREIGN KEY (`detail_transaction_id`) REFERENCES `detail_transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `User_fk5` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
