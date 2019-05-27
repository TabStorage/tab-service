USE tab_service;

DROP TABLE IF EXISTS `root`;

CREATE TABLE `root` {
    id INT unsigned NOT NULL AUTO_INCREMENT,
    is_group BOOLEAN NOT NULL,
}