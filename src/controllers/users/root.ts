import express from "express";
import { TokenSchema } from "@middlewares/token_validator";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import { Roots, UserRootAttrs } from "@models/users/roots"
import { UserFolders, UserFolderAttrs } from "@models/users/folders";
import { ErrorResult } from "@utils/error_result";

// TODO: fix type checking routine of all controllers

export async function getRoot(req: express.Request): Promise<Result> {
    let result: Result;
    let token: TokenSchema = req.context.get("token");
    if (token === null) {
        result = new Result(ErrorCode.InvalidToken, null);
    } else {
        let root = new Roots();
        let sql = `SELECT user_entity.* FROM user_entity JOIN user_root \
            ON user_entity.root_id = user_root.id \
            WHERE user_root.user_id = ${token.user_id} AND user_entity.parent_id IS NULL;`
        let queryResults = await root.query(sql);

        if (queryResults instanceof ErrorResult) {
            result = new Result(queryResults.errCode, null);
        } else {
            let temp = queryResults
                .map(result => {
                    return new UserFolders(new UserFolderAttrs(result));
                })
                .reduce((acc, folder) => 
                {
                    acc.push(folder);
                    return acc;
                }, []);
            result = new Result(ErrorCode.None, temp);
        }
    }

    return result;
}

export async function createRoot(req: express.Request): Promise<Result> {
    let result: Result;
    let token: TokenSchema = req.context.get("token");
    if (token === null) {
        result = new Result(ErrorCode.InvalidToken, null);
    } else {
        if (token.role != "admin") {
            result = new Result(ErrorCode.InvalidToken, null);
        } else {
            console.log(req.body);
            const user_id: number = parseInt(req.body.user_id);
            let root = new Roots(new UserRootAttrs({user_id: user_id}));
            let queryResult = await root.create();

            if (queryResult instanceof ErrorResult) {
                result = new Result(queryResult.errCode, null);
            } else {
                result = new Result(ErrorCode.None, null);
            }
        }
    }

    return result;
}

export async function deleteRoot(req: express.Request): Promise<Result> {
    let result: Result;
    let token: TokenSchema = req.context.get("token");
    if (token === null) {
        result = new Result(ErrorCode.InvalidToken, null);
    } else {
        if (token.role != "admin") {
            result = new Result(ErrorCode.InvalidToken, null);
        } else {
            const user_id: number = parseInt(req.body.user_id);
            let root = new Roots()
            let queryResult = await root.delete({user_id: user_id});
            
            if (queryResult == null) {
                result = new Result(ErrorCode.None, null);
            } else {
                result = new Result(queryResult.errCode, null);
            }
        }
    }

    return result;
}

export async function setRoot(req: express.Request): Promise<Result> {
    let result: Result;
    let token: TokenSchema = req.context.get("token");

    if (token == null) {
        result = new Result(ErrorCode.InvalidToken, null);
    } else {
        if (token.role != "admin") {
            result = new Result(ErrorCode.InvalidToken, null);
        } else {
        }
    }

    return result;
}