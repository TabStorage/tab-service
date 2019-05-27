USE tab_service;

DROP TABLE IF EXISTS `user_root`;

DROP TABLE IF EXISTS `group_root`;

CREATE TABLE `user_root` (
    user_id INT unsigned NOT NULL,
    
    PRIMARY KEY (user_id)
);

CREATE TABLE `group_root` (
    group_id INT unsigned NOT NULL,

    PRIMARY KEY (group_id)
);