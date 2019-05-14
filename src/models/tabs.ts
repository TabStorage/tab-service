import pool from "../db_pool";
import Entity from "./entity";

class Tabs implements Entity {
    constructor(id: number) { }

    id: number
    name: string
    url: string
    modified_time: string
    thumbnail_url: string
    is_public: boolean
    version: number
    modified_at: string
    ownership_id: number

    create = async () => {
        return new Promise<boolean>((resolve, reject) => resolve(true));
    }

    get = async (id: number) => {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    update = async (args: object) => {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        })
    }

    delete = async () => {
        return new Promise<boolean>((resolve, reject) => resolve(true));
    }
}

export default Tabs;