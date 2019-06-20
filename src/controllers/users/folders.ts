import express from "express";
import { UserFolders, UserFolderAttrs } from "@models/users/folders";
import * as datetime from "@utils/datetime";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import { ErrorResult } from "@utils/error_result";
import { TokenSchema } from "@middlewares/token_validator";
import logger from "@utils/logger";
import { pack_key_with_raw } from "@utils/special";
import { Drives } from "@models/users/drive";

// TODO: Role Permission 검증 루틴 추가 필요
// TODO: public/private & 검색 기능

// TODO: Role Permission을 Redis를 통해 캐시하자

export class UserFolderController {
    async createFolder(req: express.Request): Promise<Result> {
        let result: Result;
        let token: TokenSchema = req.context.get("token");

        // owner id는 생성 요청한 user id로
        let owner_id: number = token.user_id;

        try {
            let name: string = req.body.name;
            let drive_id: number = parseInt(req.body.drive_id);

            const drive = new Drives();
            let driveResult = await drive.get(drive_id);
            if (driveResult instanceof ErrorResult) {
                return new Result(driveResult.errCode, null);
            } else {
                if (token.user_id != driveResult.user_id) {
                    return new Result(ErrorCode.InvalidPermission, null);
                }
            }

            let parent_id: number = null;
            if (req.body.parent_id !== undefined)
                parent_id = parseInt(req.body.parent_id);
            let is_tab: boolean = false;

            let is_public: boolean = (req.body.is_public === "true");
            let version: number = 1;
            let modified_at: string = datetime.ISODateString(new Date());

            let folder = new UserFolders(new UserFolderAttrs({
                owner_id: owner_id,
                name: name,
                url: "",
                drive_id: drive_id,
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
                // TODO: Refactoring to more efficiently way
                const packed_url: string = 
                    pack_key_with_raw(drive_id, queryResult.id, queryResult.version);
                folder.update(queryResult.id, {url: packed_url});

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

        const drive_id: number = req.context.get("drive_id");
        const folder_id: number = req.context.get("target_id");
        const version: number = req.context.get("version");

        let folder = new UserFolders();
        let sql = `SELECT * FROM user_entity WHERE parent_id = ${folder_id}`;
        const queryResult = await folder.query(sql);
        if (queryResult instanceof ErrorResult) {
            result = new Result(queryResult.errCode, null);
        } else {
            let token: TokenSchema = req.context.get("token");

            let folders = queryResult
                .map(result => {
                    return new UserFolderAttrs(result);
                })
                .reduce((acc, folder: UserFolderAttrs) => 
                {
                    // private인 경우는 본인인지 검증한다.
                    if (folder.is_public) {
                        acc.push(new UserFolders(folder));
                    } else {
                        if (token !== null && token !== undefined 
                            && token.user_id === folder.owner_id) {
                                acc.push(new UserFolderAttrs(folder));
                        }
                    }

                    return acc;
                }, []);
            
            // public이거나 인증이 완료된 경우
            result = new Result(ErrorCode.None, folders);
        }

        return result;
    }

    async setFolder(req: express.Request): Promise<Result> {
        const drive_id: number = req.context.get("drive_id");
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