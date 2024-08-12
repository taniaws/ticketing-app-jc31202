/*
  Warnings:

  - A unique constraint covering the columns `[referral_code]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_referral_code_key` ON `user`(`referral_code`);
