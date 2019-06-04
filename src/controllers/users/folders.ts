import express from "express";
import { UserFolders, UserFolderAttrs } from "@models/users/folders";
import * as datetime from "@utils/datetime";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import { ErrorResult } from "@utils/error_result";
import { TokenSchema } from "@middlewares/token_validator";
import logger from "@utils/logger";
import { login_required } from "@utils/decorators/login_required";

// TODO: Role Permission 검증 루틴 추가 필요
// TODO: public/private & 검색 기능

export class UserFolderController {
    async createFolder(req: express.Request): Promise<Result> {
        let result: Result;
        let token: TokenSchema = req.context.get("token");

        // owner id는 생성 요청한 user id로
        let owner_id: number = token.user_id;

        try {
            let name: string = req.body.name;
            let root_id: number = parseInt(req.body.root_id);
            let parent_id: number = null;
            if (req.body.parent_id !== undefined)
                parent_id = parseInt(req.body.parent_id);
            let is_tab: boolean = true;

            let is_public: boolean = (req.body.is_public === "true");
            let version: number = 1;
            let modified_at: string = datetime.ISODateString(new Date());

            let folder = new UserFolders(new UserFolderAttrs({
                owner_id: owner_id,
                name: name,
                url: "",
                root_id: root_id,
                parent_id: parent_id,
                is_tab: is_tab,
                is_public: is_public,
                version: version,
                modified_at: modified_at
            }));
            let queryResult = await folder.create();
            
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

    async getFolder(req: express.Request): Promise<Result> {
        let result: Result;

        /*
        let token: TokenSchema = req.context.get("token");
        if (token === null) {
            result = new Result(ErrorCode.InvalidToken, null);
        }
        */

        const root_id: number = req.context.get("root_id");
        const folder_id: number = req.context.get("target_id");
        const version: number = req.context.get("version");

        let folder = new UserFolders();
        const queryResult = await folder.get(folder_id);
        if (queryResult instanceof ErrorResult) {
            result = new Result(queryResult.errCode, null);
        } else {
            result = new Result(ErrorCode.None, folder);
        }

        return result;
    }

    async setFolder(req: express.Request): Promise<Result> {
        // TODO: FIX here
        const root_id: number = req.context.get("root_id");
        const folder_id: number = req.context.get("target_id");
        const version: number = req.context.get("version");

        let result: Result;

        const cur_time: string = datetime.ISODateString(new Date());

        const folder = new UserFolders();

        let update_args = req.body;

        // 클라이언트에서 수정하면 안되는 컬럼들 검증
        const keys = Object.keys(update_args);
        if (keys.includes("id") || keys.includes("url") || keys.includes("is_tab") || 
            keys.includes("deleted_at") || keys.includes("modified_at")) {
                return new Result(ErrorCode.Invalid, null);
            }

        update_args.modified_at = cur_time;

        let queryResult = await folder.update(folder_id, update_args);

        if (queryResult instanceof ErrorResult) {
            result = new Result(queryResult.errCode, null);
        } else {
            result = new Result(ErrorCode.None, null);
        }

        return result;
    }

    async deleteFolder(req: express.Request): Promise<Result> {
        let result: Result;

        // TODO: role permission 검증
        const folder_id: number = req.context.get("target_id");

        const folder = new UserFolders();
        let queryResult = await folder.delete({id: folder_id});
        if (queryResult == null) {
            result = new Result(ErrorCode.None, null);
        } else {
            result = new Result(queryResult.errCode, null);
        }

        return result;
    }
}