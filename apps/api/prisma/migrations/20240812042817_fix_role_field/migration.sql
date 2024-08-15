/*
  Warnings:

  - You are about to drop the column `role_id` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_fk5` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role_id`,
    ADD COLUMN `role` ENUM('CUSTOMER', 'ADMIN') NOT NULL DEFAULT 'CUSTOMER';
