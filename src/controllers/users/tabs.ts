import express from "express";
import Result from "@utils/result";
import * as datetime from "@utils/datetime";
import { TokenSchema } from "@middlewares/token_validator";
import logger from "@utils/logger";
import ErrorCode from "@utils/error_code";
import { UserTabs } from "@models/groups/tabs";
import { UserTabAttrs } from "@models/users/tabs";
import { ErrorResult } from "@utils/error_result";
import { Drives } from "@models/users/drive";

export class UserTabController {
    async createTab(req: express.Request): Promise<Result> {
        let result: Result;

        let token: TokenSchema = req.context.get("token");

        let owner_id: number = token.user_id;

        try {
            let name: string = req.body.name;
            let drive_id: number = parseInt(req.body.drive_id);

            const drive = new Drives();
            let driveResult = await drive.get(drive_id);
            if (driveResult instanceof ErrorResult) {
                return new Result(driveResult.errCode, null);
            } else if (token.user_id != driveResult.user_id) {
                return new Result(ErrorCode.InvalidPermission, null);
            }

            let parent_id: number = null;
            if (req.body.parent_id !== undefined)
                parent_id = parseInt(req.body.parent_id);
            let is_tab: boolean = false;

            let url: string = req.body.url;
            let thumbnail_url: string = req.body.thumbnail_url;

            let is_public: boolean = (req.body.is_public === "true");
            let version: number = 1;
            let modifed_at: string = datetime.ISODateString(new Date());

            let tab = new UserTabs(new UserTabAttrs({
                owner_id: owner_id,
                name: name,
                drive_id: drive_id,
                parent_id: parent_id,
                is_tab: is_tab,
                url: url,
                thumbnail_url: thumbnail_url,
                is_public: is_public,
                version: version,
                modified_at: modifed_at
            }));
            let queryResult = await tab.create();

            if (queryResult instanceof ErrorResult) {
                result = new Result(queryResult.errCode, null);
            } else {
                result = new Result(ErrorCode.None, null);
            }

        } catch(err) {
            logger.info(err);
            result = new Result(ErrorCode.Invalid, null);
        }

        return result;
    }

    async getTab(req: express.Request): Promise<Result> {
        let result: Result;

        return result;
    }

    async deleteTab(req: express.Request): Promise<Result> {
        let result: Result;
        return result;
    }

    async setTab(req: express.Request): Promise<Result> {
        let result: Result;
        return result;
    }
}

export default UserTabController;