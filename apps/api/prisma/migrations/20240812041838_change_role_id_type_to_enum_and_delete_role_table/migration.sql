/*
  Warnings:

  - You are about to alter the column `role_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_fk5`;

-- AlterTable
ALTER TABLE `user` MODIFY `role_id` ENUM('CUSTOMER', 'ADMIN') NOT NULL;

-- DropTable
DROP TABLE `role`;
