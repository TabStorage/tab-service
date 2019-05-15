USE tab_service;

DROP TABLE IF EXISTS `entity`;

CREATE TABLE entity (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    owner_id INT unsigned NOT NULL,
    root_id INT unsigned DEFAULT NULL,
    parent_id INT unsigned DEFAULT NULL,
    thumbnail_url VARCHAR(255) DEFAULT NULL,
    is_tab BOOLEAN NOT NULL,
    is_public BOOLEAN NOT NULL,
    is_group BOOLEAN NOT NULL,
    version INT unsigned NOT NULL DEFAULT 1,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (parent_id) REFERENCES entity(id),
    FOREIGN KEY (root_id) REFERENCES entity(id)
);