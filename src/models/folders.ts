import pool from "../db_pool";
import Entity from "./entity";
import * as datetime from "../utils/datetime"

// TODO: add profer validation

class Folders implements Entity {
    constructor() {
        this.id = 0;
    }

    id: number
    name: string
    // used for tab stroage link
    url: string
    parent_id: number
    root_id: number
    is_public: boolean
    is_group: boolean
    version: number
    modified_at: string
    owner_id: number

    create = async () => {
        if (this.id <= 0) {
            console.log('Empty id');
            return false;
        }

        try {
            let sql: string;
            let params: Array<any>;

            // treat special for root folder
            if (this.root_id == 0 && this.parent_id == 0) {
                // here do not treat root_id & parent_id
                sql = "INSERT INTO entity(is_tab, name, url, is_public, \
                        is_group, version, modified_at, owner_id) \
                        VALUES (false, ?, ?, ?, ?, ?, ?, ?)";
                params = [this.name, this.url, this.is_public,
                    this.is_group, this.version, datetime.ISODateString(new Date()), this.owner_id];
            } else {
                sql = "INSERT INTO entity(is_tab, name, url, parent_id, root_id, is_public, \
                        is_group, version, modified_at, owner_id) \
                        VALUES (false, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                params = [this.name, this.url, this.parent_id, this.root_id, this.is_public,
                    this.is_group, this.version, datetime.ISODateString(new Date()), this.owner_id];
            }
            
            const [result] = await pool.query(sql, params);
            return true;
        } catch(err) {
            console.log(`Failed to create a folder ${this.id}!\nerr: ${err}`)
            return false;
        }
    }

    get = async (id: number) => {
        this.id = id;
        try {
            const [result, fields] = await pool.query(
                "SELECT * FROM entity WHERE `id` = ?", [this.id]);

            if (result.length != 1) {
                console.log(`Inexists folder ${id}`)
                return false;
            } else if (result[0].is_tab) {
                console.log(`Invalid folder ${id}`)
                return false;
            }

            this.name = result[0].name;
            this.url = result[0].url;
            this.parent_id = result[0].parent_id;
            this.root_id = result[0].root_id;
            this.owner_id = result[0].ownership_id;
            this.is_public = result[0].is_public == 1;
            this.is_group = result[0].is_group == 1;
            this.version = result[0].version;
            this.modified_at = result[0].modified_at;

            return true;
        } catch(err) {
            console.log(`Failed to load a folder ${id}!\nerr: ${err}`)
            return false;
        }
    }

    update = async (args: object) => {
        if (this.id < 0) {
            console.log(`Invalid id ${this.id}`);
            return false;
        }

        try {
            const [result] = await pool.query(
                "UPDATE entity SET ? WHERE id = ?", [args, this.id]);

            return true;
        } catch(err) {
            console.log(`Failed to save a folder ${this.id}\nerr: ${err}`)
            return false;
        }
    }

    delete = async () => {
        try {
            // TODO: try recursive delete through job queue

            return true;
        } catch(err) {
            console.log(`Failed to delete a folder ${this.id}\nerr: ${err}`)
            return false;
        }
    }

    toJSON() { 
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            owner_id: this.owner_id,
            is_public: this.is_public,
            is_group: this.is_group,
            version: this.version,
            modified_at: this.modified_at
        };
    }
}

export default Folders;