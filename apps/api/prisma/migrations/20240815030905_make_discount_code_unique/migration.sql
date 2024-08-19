/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `discount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `discount_code_key` ON `discount`(`code`);
