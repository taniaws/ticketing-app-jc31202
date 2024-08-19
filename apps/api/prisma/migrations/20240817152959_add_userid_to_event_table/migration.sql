/*
  Warnings:

  - Added the required column `user_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Event_fk9_idx` ON `event`(`user_id`);

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk9` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
