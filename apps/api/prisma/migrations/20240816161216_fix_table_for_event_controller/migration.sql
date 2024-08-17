/*
  Warnings:

  - You are about to drop the column `status` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `event` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `status`,
    DROP COLUMN `type`,
    ADD COLUMN `status_id` INTEGER NOT NULL,
    ADD COLUMN `type_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Statusname` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` ENUM('FREE', 'PAID') NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Event_fk5` ON `event`(`type_id`);

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk5` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
