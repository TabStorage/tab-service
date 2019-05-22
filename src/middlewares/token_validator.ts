import express from "express";
import jwt from "jsonwebtoken";
import async_handler from "express-async-handler";
import logger from "@utils/logger";
import * as config from "@config/jwt_config";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";

export type TokenSchema = {user_id: number, groups: Array<number>}

function asyncVerify(token: string): Promise<TokenSchema> {
    return new Promise<TokenSchema>((resolve, reject) => {
        jwt.verify(token, config.secret_key, (err: Error, decoded) => {
            if (err != null) {
                reject(err);
            } else {
                resolve(decoded as TokenSchema);
            }
        });
    });
}

const token_validator = async_handler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token: string = req.headers['x-access-token'] || req.query.token;

    if (token) {
        try {
            let decoded = await asyncVerify(token);
            req.context.set("token", decoded);
        } catch(err) {
            logger.info(err);
            return new Result(ErrorCode.InvalidToken, 401, null);
        }
    }

    next();
});

export default token_validator;