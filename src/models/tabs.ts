import pool from "../db_pool";
import Entity from "./entity";
import * as datetime from "../utils/datetime";
import logger from "../logger";

// TODO: add profer validation

class Tabs implements Entity {
    constructor(id: number) { 
        this.id = 0;
    }

    id: number
    name: string
    url: string
    thumbnail_url: string
    is_public: boolean
    is_group: boolean
    version: number
    owner_id: number
    parent_id: number
    root_id: number
    modified_at: string

    is_tab: boolean = true;

    create = async () => {
        if (this.id <= 0) {
            logger.info('Empty id');
            return false;
        }

        // tab always need parent folder 
        if (this.parent_id <= 0) {
            logger.info('Empty parent_id');
            return false;
        }

        if (this.root_id <= 0) {
            logger.info(`Empty parent_id`);
            return false;
        }

        if (!this.is_tab) {
            logger.info(`Cannot save folder through Tabs`);
            return false;
        }

        try {
            let sql: string;
            let params: Array<any>;

            sql = "INSERT INTO entity(is_tab, name, url, thumbnail_url, is_public, is_group, version, \
                owner_id, parent_id, root_id, modified_at) VALUES(true, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            params = [this.name, this.url, this.thumbnail_url, this.is_public, this.is_group, this.version, 
                this.owner_id, this.parent_id, this.root_id, datetime.ISODateString(new Date())];

            const [result] = await pool.query(sql, params);
            return true;
        } catch(err) {
            logger.error(`Failed to create a tab ${this.id}\nerr: ${err}`)
            return false;
        }
    }

    get = async (id: number) => {
        this.id = id;

        try {
            const [result, fields] = await pool.query(
                "SELECT * FROM entity WHERE `id` = ?", [this.id]);

            if (result.length != 1) {
                logger.info(`Inexists tab ${id}`);
                return false;
            } else if (!result[0].is_tab) {
                logger.info(`Invalid tab ${id}`);
                return false;
            }

            this.name = result[0].name;
            this.url = result[0].url;
            this.thumbnail_url = result[0].thumbnail_url;
            this.is_public = result[0].is_public;
            this.is_group = result[0].is_group;
            this.version = result[0].version;
            this.owner_id = result[0].owner_id;
            this.parent_id = result[0].parent_id;
            this.root_id = result[0].root_id;
            this.modified_at = result[0].modified_at;

            return true;
        } catch(err) {
            logger.error(`Failed to load a tab ${id}!\nerr: ${err}`)
            return false;
        }
    }

    update = async (args: object) => {
        if (this.id < 0) {
            logger.info(`Invalid id ${this.id}`);
            return false;
        }

        if (!this.is_tab) {
            logger.info(`Cannot change tab to folder`);
            return false;
        }

        try {
            const [result] = await pool.query(
                "UPDATE entity SET ? WHERE id = ?", [args, this.id]);

            return true;
        } catch(err) {
            logger.error(`Faield to update a tab ${this.id}\nerr: ${err}`);
            return false;
        }
    }

    delete = async () => {
        // TODO: implement here
        return new Promise<boolean>((resolve, reject) => resolve(true));
    }
}

export default Tabs;