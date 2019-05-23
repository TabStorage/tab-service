import pool from "@utils/db_pool";
import logger from "@utils/logger";
import { Queryable } from "@models/queryable";
import { Storable } from "@models/storable";
import { Serializable } from "./serializable";

export class DefaultQuery<T extends Storable> implements Queryable<T>, Serializable<T> {
    constructor(attrs: T) {
        this.attrs= attrs;
    }

    public attrs: T

    create = async (obj: T): Promise<T | Error> => { 
        if (obj === null) {
            return new Error("obj is null");
        }

        if (obj.table === "") {
            return new Error("Empty name of table");
        }

        try {
            let sql: string = `INSERT INTO ${obj.table} entity SET ?`;
            const [result] = await pool.query(sql, obj);
            return obj;
        } catch(err) {
            return err;
        }
    }

    get = async (): Promise<T | Error> => { 
        let obj: T = this.attrs;
        console.log("here");
        if (obj.id < 0) {
            return new Error("invalid id");
        }

        try {
            const [results, fields] = await pool.query(`SELECT * FROM ${obj.table} WHERE \`id\` = ?`, [obj.id]);

            // TODO: Add custom validator

            if (results.length != 1) {
                logger.info(`Inexists object in db. id: ${obj.id}`);
                return new Error("Inexists object in db");
            } 

            const entity: T = results[0];
            console.log(entity);
            return entity;

        } catch(err) {
            logger.error(err);
            return err;
        }
    }

    getAll = async (obj_list: Array<T>): Promise<Array<T> | Error> => { 
        //TODO: implments
        return Promise.resolve(null); 
    }

    update = async (obj: T, args: object): Promise<T | Error> => {
        //TODO: implements
        try {
            return obj;
        } catch(error) {
            return error;
        }
    }

    delete = async (obj: T): Promise<Error> => { 
        //TODO: implements
        return Promise.resolve(null); 
    }

    toJSON = (): object => {
        let obj = this.attrs;
        console.log(obj);
        const keys = Object.keys(obj) as (keyof T)[]
        console.log(`key: ${keys}`);
        let pairs = keys.map(key => {
                    const pairs: [keyof T, T[keyof T]] = [key, obj[key]];
                    return pairs;
                });

        let temp: any = {}; 

        return pairs.reduce((acc, [key, val]) => {
            acc[key] = val;
            return acc;
        }, temp); 
    }
}