import pool from "../db_pool";
import Entity from "./entity";

class Tabs implements Entity {
    constructor(id: number) { }

    id: number
    name: string
    url: string
    modified_time: string
    thumbnail_url: string

    //todo: add owner info
    from_db_func = async (id: number) => {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }
    to_db_func = async () => {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }
}

export default Tabs;