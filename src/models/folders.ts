import pool from "../db_pool";
import Entity from "./entity";
import * as datetime from "../utils/datetime"
import { rejects } from "assert";

class Folders implements Entity {
    constructor() {
        this.id = 0;
    }

    id: number
    name: string
    url: string
    parent_id: number
    is_public: boolean
    version: number
    modified_at: string
    ownership_id: number

    create =  async () => {
        return new Promise<boolean>((resolve, reject) => resolve(true));
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
            this.ownership_id = result[0].ownership_id;
            this.is_public = result[0].is_public;
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
                "UPDATE entity SET ? WHERE id = ?",
                [args, this.id]
                //[this.name, this.url, this.parent_id, this.is_public, this.version, 
                //    datetime.ISODateString(new Date()), this.id]
            )

            console.log(result);
            return true;
        } catch(err) {
            console.log(`Failed to save a folder ${this.id}\nerr: ${err}`)
            return false;
        }
    }

    delete = async () => {
        return new Promise<boolean>((resolve, reject) => resolve(true));
    };
}

export default Folders;