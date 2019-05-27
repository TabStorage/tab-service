import express from "express";
import { TokenSchema } from "@middlewares/token_validator";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import { Roots } from "@models/users/roots"

export async function getRoot(req: express.Request, res: express.Response) {
    let result: Result;
    let token: TokenSchema = req.context.get("token");
    if (token === null) {
        result = new Result(ErrorCode.InvalidToken, 401, null);
    } else {
        let root = new Roots();
        let sql = `SELECT user_entity.* FROM user_entity JOIN user_root \
            ON user_entity.root_id = user_root.id WHERE user_root.user_id = ${token.user_id};`
        let queryResults = await root.query(sql);

        if (queryResults instanceof Error) {
            result = new Result(ErrorCode.Inexists, 404, null);
        } else {
            result = new Result(ErrorCode.None, 200, queryResults);
        }
    }

    return result;
}