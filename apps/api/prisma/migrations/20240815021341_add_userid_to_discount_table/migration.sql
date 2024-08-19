/*
  Warnings:

  - Added the required column `code` to the `discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `discount` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Discount_fk1` ON `discount`(`user_id`);

-- AddForeignKey
ALTER TABLE `discount` ADD CONSTRAINT `Discount_fk1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
