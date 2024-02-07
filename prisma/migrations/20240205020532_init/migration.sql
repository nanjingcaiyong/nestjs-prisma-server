-- CreateTable
CREATE TABLE `Story` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storyName` VARCHAR(100) NOT NULL,
    `creatorName` VARCHAR(30) NOT NULL,
    `createAt` TIMESTAMP NOT NULL,
    `updateAt` TIMESTAMP NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `description` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Page` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(60) NOT NULL,
    `createAt` TIMESTAMP NOT NULL,
    `updateAt` TIMESTAMP NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `description` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `Page_pageName_key`(`pageName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoryPage` (
    `storyId` INTEGER NOT NULL,
    `pageId` INTEGER NOT NULL,
    `createAt` TIMESTAMP NOT NULL,
    `updateAt` TIMESTAMP NOT NULL,

    PRIMARY KEY (`storyId`, `pageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL,
    `creatorName` VARCHAR(30) NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `createAt` TIMESTAMP NOT NULL,
    `updateAt` TIMESTAMP NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Track` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('CPS', 'GA3', 'GA4') NOT NULL,
    `content` VARCHAR(500) NOT NULL,
    `createAt` TIMESTAMP NOT NULL,
    `updateAt` TIMESTAMP NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StoryPage` ADD CONSTRAINT `StoryPage_storyId_fkey` FOREIGN KEY (`storyId`) REFERENCES `Story`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoryPage` ADD CONSTRAINT `StoryPage_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `Page`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
