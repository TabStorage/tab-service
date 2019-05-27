USE tab_service;

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `user_root`;

DROP TABLE IF EXISTS `group_root`;

SET foreign_key_checks = 1;

CREATE TABLE `user_root` (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    user_id INT unsigned NOT NULL UNIQUE,
    
    PRIMARY KEY (id)
);

CREATE TABLE `group_root` (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    group_id INT unsigned NOT NULL UNIQUE,

    PRIMARY KEY (id)
);