import pool from "../db_pool";
import Entity from "./entity";

class Folders implements Entity {
    constructor() { }

    id: number
    name: string
    url: string
    modified_time: string

    //todo: add owner info
    from_db_func = async (id: number) => {
        this.id = id;
        try {
            const [result, fields] = await pool.query(
                "SELECT * FROM entity WHERE `id` = ?", [this.id]);

            if (result.length != 1) {
                console.log(`not exists ${id}`)
                return false;
            }

            console.log(`FOLDERS => ${typeof(result)} / ${fields}`)
            return true;
        } catch(err) {
            console.log(`not exists ${id}!`)
            return false;
        }
    }

    to_db_func = async () => {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }
}

export default Folders;