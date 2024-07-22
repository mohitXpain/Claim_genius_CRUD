/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Register` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Register_name_key` ON `Register`(`name`);
