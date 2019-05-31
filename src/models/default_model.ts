import pool from "@utils/db_pool";
import logger from "@utils/logger";
import { Queryable } from "@models/queryable";
import { Storable } from "@models/storable";
import { Serializable } from "@models/serializable";
import ErrorCode from "@utils/error_code";

export class DefaultModel<T extends Object> implements Queryable<T>, Serializable<T>, Storable {
    constructor(attrs: T, table: string, white_list: Array<string>) {
        this.attrs = attrs;
        this.table= table;
        this.white_list = white_list as (keyof T)[];
    }

    public table: string;
    public attrs: T;
    public white_list: Array<keyof T>;

    create = async (): Promise<T | ErrorCode> => { 
        let obj: T = this.attrs;
        const err = this.validate_table(obj);
        if (err != ErrorCode.None) {
            return err;
        }

        try {
            let sql: string = `INSERT INTO ${this.table} SET ?`;
            const [result] = await pool.query(sql, obj);
            return obj;
        } catch(err) {
            logger.error(err);
            return ErrorCode.Internal;
        }
    }

    get = async (id: number): Promise<T | ErrorCode> => { 
        if (id < 0) {
            logger.error("")
            return ErrorCode.Invalid;
        }

        try {
            const [results, fields] = 
                await pool.query(`SELECT * FROM ${this.table} WHERE \`id\` = ?`, [id]);

            if (results.length != 1) {
                logger.info(`Inexists object in db. id: ${id}`); 
                return ErrorCode.Inexists; 
            } 

            this.attrs = results[0] as T;
            return this.attrs;

        } catch(err) {
            logger.error(err);
            return ErrorCode.Internal;
        }
    }

    getAll = async (obj_list: Array<T>): Promise<Array<T> | ErrorCode> => { 
        //TODO: implments
        return Promise.resolve(null); 
    }

    update = async (obj: T, args: object): Promise<T | ErrorCode> => {
        //TODO: implements
        try {
            return obj;
        } catch(err) {
            logger.error(err);
            return ErrorCode.Internal;
        }
    }

    delete = async (key: Object): Promise<ErrorCode> => { 
        if (key == null) {
            logger.error("key object is null");
            return ErrorCode.Invalid;
        }

        if (Object.keys(key).length != 1) {
            logger.error("number of keys the object has exceeds one");
            return ErrorCode.Invalid;
        }

        try {
            const [results, _] = await pool.query(`DELETE FROM ${this.table} WHERE ?`, key);

            return ErrorCode.None;
        } catch(err) {
            logger.error(err);
            return ErrorCode.Internal;
        }
    }

    query = async (query: string): Promise<Array<object> | ErrorCode> => {
        if (query === "") {
            logger.error("Empty SQL");
            return ErrorCode.Internal;
        }

        try {
            const [results, fields] = await pool.query(query);

            let queryResults: Array<object> = new Array<object>();
            results.forEach((result: T) => {
                queryResults.push(result);
            });
            return queryResults;
        } catch (err) {
            logger.error(err);
            return ErrorCode.Internal;
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

    protected validate_table(obj: T): ErrorCode {
        if (obj === null) {
            logger.error("obj is null");
            return ErrorCode.Internal;
        }

        if (this.table === "") {
            logger.error("Empty name of table");
            return ErrorCode.Empty;
        }

        return ErrorCode.None;
    }
}