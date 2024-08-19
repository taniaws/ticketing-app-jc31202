-- CreateIndex
CREATE INDEX `Event_fk11_idx` ON `event`(`status_id`);

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `Event_fk11` FOREIGN KEY (`status_id`) REFERENCES `status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
