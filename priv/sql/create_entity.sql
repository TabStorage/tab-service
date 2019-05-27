USE tab_service;

DROP TABLE IF EXISTS `user_entity`;

DROP TABLE IF EXISTS `group_entity`;

CREATE TABLE user_entity (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    owner_id INT unsigned NOT NULL,
    root_id INT unsigned DEFAULT NULL,
    parent_id INT unsigned DEFAULT NULL,
    thumbnail_url VARCHAR(255) DEFAULT NULL,
    is_tab BOOLEAN NOT NULL,
    is_public BOOLEAN NOT NULL,
    version INT unsigned NOT NULL DEFAULT 1,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (parent_id) REFERENCES user_entity(id),
    FOREIGN KEY (root_id) REFERENCES user_root(user_id)
);

CREATE TABLE group_entity (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    owner_id INT unsigned NOT NULL,
    root_id INT unsigned DEFAULT NULL,
    parent_id INT unsigned DEFAULT NULL,
    thumbnail_url VARCHAR(255) DEFAULT NULL,
    is_tab BOOLEAN NOT NULL,
    is_public BOOLEAN NOT NULL,
    version INT unsigned NOT NULL DEFAULT 1,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (parent_id) REFERENCES group_entity(id),
    FOREIGN KEY (root_id) REFERENCES group_root(group_id)
)