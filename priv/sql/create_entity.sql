CREATE TABLE entity (
    id INT unsigned NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    owner_id INT unsigned NOT NULL,
    parent_id INT unsigned NOT NULL,
    thumbnail_url VARCHAR(255) NULL,
    modified_at DATETIME NOT NULL,
    deleted_at DATETIME NULL,
    PRIMARY KEY (id)
);