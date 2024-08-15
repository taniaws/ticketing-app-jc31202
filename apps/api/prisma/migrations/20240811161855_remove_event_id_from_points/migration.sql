/*
  Warnings:

  - You are about to drop the column `event_id` on the `point` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `point` DROP FOREIGN KEY `Point_fk2`;

-- AlterTable
ALTER TABLE `point` DROP COLUMN `event_id`;
