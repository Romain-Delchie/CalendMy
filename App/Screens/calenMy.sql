SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `rendez_vous`;
DROP TABLE IF EXISTS `rendez_vous_account`;
DROP TABLE IF EXISTS `list`;
DROP TABLE IF EXISTS `list_item`;
DROP TABLE IF EXISTS `todo`;

CREATE TABLE `account` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(15) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `color` VARCHAR(7) NOT NULL,
    `image_link` VARCHAR(30) NOT NULL,
);

CREATE TABLE `agenda` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
);

CREATE TABLE `rendez_vous` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `instruction` TEXT,
    `date` DATE NOT NULL,
    `begin_hour` TIME NOT NULL,
    `end_hour` TIME NOT NULL,
    `agenda_id` INT NOT NULL,
    FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE CASCADE
);

CREATE TABLE `rendez_vous_account` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `rendez_vous_id` INT NOT NULL,
    `account_id` INT NOT NULL,
    `agenda_id` INT NOT NULL,
    FOREIGN KEY (`rendez_vous_id`) REFERENCES `rendez_vous`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE CASCADE
);

CREATE TABLE `list` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(40),
    `agenda_id` INT NOT NULL,
    FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE CASCADE
);

CREATE TABLE `list_item` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `list_id` INT NOT NULL,
    `account_id` INT NOT NULL,
    `agenda_id` INT NOT NULL,
    FOREIGN KEY (`list_id`) REFERENCES `list`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE CASCADE
);

CREATE TABLE `todo` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(20) NOT NULL,
    `ranking` INT NOT NULL,
    `account_id` INT NOT NULL,
    `agenda_id` INT NOT NULL,
    FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`agenda_id`) REFERENCES `agenda`(`id`) ON DELETE CASCADE
);