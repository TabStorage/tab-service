USE tab_service;

-- CREATE ROOT FOLDER for user 13
INSERT INTO entity(name, url, owner_id, is_tab, is_public, is_group, modified_at) 
    VALUES('dev', 'url', 13, false, true, false, CURDATE());

INSERT INTO entity(name, url, owner_id, is_tab, is_public, is_group, modified_at)
    VALUES('shopping', 'url', 13, false, true, false, CURDATE());

INSERT INTO entity(name, url, owner_id, is_tab, is_public, is_group, modified_at)
    VALUES('sports', 'url', 13, false, false, false, CURDATE());

-- CREATE ROOT FOLDER for user 15
INSERT INTO entity(name, url, owner_id, is_tab, is_public, is_group, modified_at) 
    VALUES('movie', 'url', 15, false, true, false, CURDATE());

INSERT INTO entity(name, url, owner_id, is_tab, is_public, is_group, modified_at) 
    VALUES('cook', 'url', 15, false, true, false, CURDATE());

-- INSERT SUB entity for user 13
INSERT INTO entity(name, url, owner_id, root_id, parent_id, is_tab, is_public, 
    is_group, modified_at) VALUES(
        'Elixir', 'https://elixir-lang.org', 13, 1, 1, true, true, false, CURDATE());