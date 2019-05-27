USE tab_service;

-- CREATE ROOT FOLDER for user 13
INSERT INTO user_root(user_id) VALUES(13);

INSERT INTO user_entity(name, url, owner_id, is_tab, is_public, modified_at, root_id) 
    VALUES('dev', 'url', 13, false, true, CURDATE(), 13);

INSERT INTO user_entity(name, url, owner_id, is_tab, is_public, modified_at, root_id)
    VALUES('shopping', 'url', 13, false, true, CURDATE(), 13);

INSERT INTO user_entity(name, url, owner_id, is_tab, is_public, modified_at, root_id)
    VALUES('sports', 'url', 13, false, true, CURDATE(), 13);

-- CREATE ROOT FOLDER for user 15
INSERT INTO user_root(user_id) VALUES(15);

INSERT INTO user_entity(name, url, owner_id, is_tab, is_public, modified_at, root_id) 
    VALUES('movie', 'url', 15, false, true, CURDATE(), 15);

INSERT INTO user_entity(name, url, owner_id, is_tab, is_public, modified_at, root_id) 
    VALUES('cook', 'url', 15, false, true, CURDATE(), 15);

-- INSERT SUB entity for user 13
INSERT INTO user_entity(name, url, owner_id, parent_id, is_tab, is_public, 
    modified_at, root_id) VALUES(
        'Elixir', 'https://elixir-lang.org', 13, 1, true, true, CURDATE(), 13);