CREATE TABLE entity (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    ownership_id INT unsigned NOT NULL,
    parent_id INT unsigned NOT NULL,
    thumbnail_url VARCHAR(255) NULL,
    is_tab BOOLEAN NOT NULL,
    is_public BOOLEAN NOT NULL,
    version INT unsigned NOT NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY (id)
);