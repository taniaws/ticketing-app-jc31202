/*
  Warnings:

  - You are about to drop the column `status_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_fk5`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `status_id`,
    DROP COLUMN `type_id`,
    ADD COLUMN `status` ENUM('UPCOMING', 'ONGOING', 'COMPLETED') NOT NULL,
    ADD COLUMN `type` ENUM('FREE', 'PAID') NOT NULL;

-- DropTable
DROP TABLE `status`;

-- DropTable
DROP TABLE `type`;
