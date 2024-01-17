-- CreateTable
CREATE TABLE `story` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creatorName` VARCHAR(30) NOT NULL,
    `createTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
