import pool from "@utils/db_pool";
import logger from "@utils/logger";
import { Queryable } from "@models/queryable";
import { Storable } from "@models/storable";
import { Serializable } from "@models/serializable";

export class DefaultModel<T extends Storable> implements Queryable<T>, Serializable<T> {
    constructor(attrs: T, white_list: Array<string>) {
        this.attrs= attrs;
        this.white_list = white_list as (keyof T)[];
    }

    public attrs: T
    public white_list: Array<keyof T>;

    create = async (obj: T): Promise<T | Error> => { 
        const err = this.validate_table(obj);
        if (err != null) {
            return err;
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
        if (obj.id < 0) {
            return new Error("invalid id");
        }

        try {
            const [results, fields] = await pool.query(`SELECT * FROM ${obj.table} WHERE \`id\` = ?`, [obj.id]);

            // TODO: Add custom validator

            if (results.length != 1) {
                logger.info(`Inexists object in db. id: ${obj.id}`); return new Error("Inexists object in db"); } 
            this.attrs = results[0];
            return this.attrs;

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

    query = async (query: string): Promise<Array<T> | Error> => {
        if (query === "") {
            return new Error("Empty SQL");
        }

        try {
            const [results, fields] = await pool.query(query);

            let queryResults: Array<T> = new Array<T>();
            results.forEach((result: T) => {
                queryResults.push(result);
            });
            return queryResults;
        } catch (err) {
            return err;
        }
    };

    toJSON = (): object => {
        let obj = this.attrs;
        const keys = Object.keys(obj) as (keyof T)[]
        let pairs = keys.map(key => {
                    const pairs: [keyof T, T[keyof T]] = [key, obj[key]];
                    return pairs;
                });

        let temp: any = {}; 

        return pairs.reduce((acc, [key, val]) => {
            if (this.white_list.includes(key)) {
                acc[key] = val;
                return acc;
            } else {
                return acc;
            }
        }, temp); 
    }

    protected validate_table(obj: T): Error {
        if (obj === null) {
            return new Error("obj is null");
        }

        if (obj.table === "") {
            return new Error("Empty name of table");
        }

        return null;
    }
}