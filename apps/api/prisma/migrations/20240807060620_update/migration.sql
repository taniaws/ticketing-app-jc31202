/*
  Warnings:

  - Added the required column `categori_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `categori_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `categori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoriname` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Event_fk7_idx` ON `event`(`categori_id`);

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk7` FOREIGN KEY (`categori_id`) REFERENCES `categori`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
