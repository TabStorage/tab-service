USE tab_service;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `user_drive`;

DROP TABLE IF EXISTS `group_drive`;

SET foreign_key_checks = 1;

CREATE TABLE `user_drive` (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    user_id INT unsigned NOT NULL UNIQUE,
    
    PRIMARY KEY (id)
);

CREATE TABLE `group_drive` (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    group_id INT unsigned NOT NULL UNIQUE,

    PRIMARY KEY (id)
);