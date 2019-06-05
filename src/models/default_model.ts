import pool from "@utils/db_pool";
import logger from "@utils/logger";
import { Queryable } from "@models/queryable";
import { Storable } from "@models/storable";
import { Serializable } from "@models/serializable";
import { SequentiableObject } from "@models/sequentiable";
import ErrorCode from "@utils/error_code";
import { ErrorResult } from "@utils/error_result"
import DBErrCode from "@utils/db_err_code";

export class DefaultModel<T extends SequentiableObject> implements Queryable<T>, Serializable<T>, Storable {
    constructor(attrs: T, table: string, white_list: Array<string>) {
        this.attrs = attrs;
        this.table= table;
        this.white_list = white_list as (keyof T)[];
    }

    public table: string;
    public attrs: T;
    public white_list: Array<keyof T>;

    create = async (): Promise<T | ErrorResult> => { 
        let obj: T = this.attrs;
        const err = this.validate_table(obj);
        if (err != ErrorCode.None) {
            return new ErrorResult(err);
        }

        try {
            let sql: string = `INSERT INTO ${this.table} SET ?;`;
            const [result, _fields] = await pool.query(sql, obj);
            obj.id = result.insertId;
            return obj;
        } catch(err) {
            return DBErrCode.toErrorResult(err);
        }
    }

    get = async (id: number): Promise<T | ErrorResult> => { 
        if (id < 0) {
            logger.error("ID must be greater than 0");
            return new ErrorResult(ErrorCode.Invalid);
        }

        try {
            const [results, fields] = 
                await pool.query(`SELECT * FROM ${this.table} WHERE \`id\` = ?`, [id]);

            if (results.length != 1) {
                logger.info(`Inexists object in db. id: ${id}`); 
                return new ErrorResult(ErrorCode.Inexists); 
            } 

            this.attrs = results[0] as T;
            return this.attrs;

        } catch(err) {
            return DBErrCode.toErrorResult(err);
        }
    }

    getAll = async (obj_list: Array<T>): Promise<Array<T> | ErrorResult> => { 
        //TODO: implments
        return Promise.resolve(null); 
    }

    update = async (target_id: number, args: object): Promise<ErrorResult> => {
        if (target_id < 0) {
            logger.error("ID must be greater than 0");
            return new ErrorResult(ErrorCode.Invalid);
        }

        try {
            const sql: string = `UPDATE ${this.table} SET ? WHERE id = ?`;
            const [results, _] = await pool.query(sql, [args, target_id]);

            if (results.affectedRows == 1) {
                return new ErrorResult(ErrorCode.None);
            } else {
                return new ErrorResult(ErrorCode.Internal);
            }
        } catch(err) {
            return DBErrCode.toErrorResult(err);
        }
    }

    delete = async (key: Object): Promise<ErrorResult> => { 
        if (key == null) {
            logger.error("key object is null");
            return new ErrorResult(ErrorCode.Invalid);
        }

        if (Object.keys(key).length != 1) {
            logger.error("number of keys the object has exceeds one");
            return new ErrorResult(ErrorCode.Invalid);
        }

        try {
            const [results, _] = await pool.query(`DELETE FROM ${this.table} WHERE ?`, key);

            return new ErrorResult(ErrorCode.None);
        } catch(err) {
            return DBErrCode.toErrorResult(err);
        }
    }

    query = async (query: string): Promise<Array<object> | ErrorResult> => {
        if (query === "") {
            logger.error("Empty SQL");
            return new ErrorResult(ErrorCode.Internal);
        }

        try {
            const [results, fields] = await pool.query(query);

            let queryResults: Array<object> = new Array<object>();
            results.forEach((result: T) => {
                queryResults.push(result);
            });
            return queryResults;
        } catch (err) {
            return DBErrCode.toErrorResult(err);
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