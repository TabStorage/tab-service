import express from "express";
import { TokenSchema } from "@middlewares/token_validator";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import { Drives, UserDriveAttrs } from "@models/users/drive"
import { UserFolders, UserFolderAttrs } from "@models/users/folders";
import { ErrorResult } from "@utils/error_result";

export class UserDriveController{
    async getDrive(req: express.Request): Promise<Result> {
        let result: Result;
        let token: TokenSchema = req.context.get("token");
        
        let drive = new Drives();
        let sql = `SELECT user_entity.* FROM user_entity JOIN user_drive \
            ON user_entity.drive_id = user_drive.id \
            WHERE user_drive.user_id = ${token.user_id} AND user_entity.parent_id IS NULL;`
        let queryResults = await drive.query(sql);

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

        return result;
    }

    async createDrive(req: express.Request): Promise<Result> {
        let result: Result;
        let token: TokenSchema = req.context.get("token");

        const user_id: number = parseInt(req.body.user_id);
        let drive = new Drives(new UserDriveAttrs({user_id: user_id}));
        let queryResult = await drive.create();

        if (queryResult instanceof ErrorResult) {
            result = new Result(queryResult.errCode, null);
        } else {
            result = new Result(ErrorCode.None, null);
        }

        return result;
    }

    async deleteDrive(req: express.Request): Promise<Result> {
        let result: Result;
        let token: TokenSchema = req.context.get("token");
        const user_id: number = parseInt(req.body.user_id);

        let drive = new Drives()
        let queryResult = await drive.delete({user_id: user_id});
        
        if (queryResult == null) {
            result = new Result(ErrorCode.None, null);
        } else {
            result = new Result(queryResult.errCode, null);
        }

        return result;
    }
}