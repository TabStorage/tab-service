import express from "express";
import { GroupFolders, GroupFolderAttrs } from "@models/groups/folders";
import * as datetime from "@utils/datetime";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import { ErrorResult } from "@utils/error_result";

export async function createFolder(req: express.Request, res: express.Response) {

}

export async function getFolder(req: express.Request, res: express.Response) {
    const root_id: number = req.context.get("root_id");
    const folder_id: number = req.context.get("target_id");
    const version: number = req.context.get("version");

    let result: Result;

    let folder = new GroupFolders();
    const queryResult = await folder.get(folder_id);
    if (queryResult instanceof ErrorResult) {
        result = new Result(queryResult.errCode, null);
    } else {
        result = new Result(ErrorCode.None, folder);
    }

    return result;
}

export async function setFolder(req: express.Request, res: express.Response) {
    let result: Result;

    const folder_id: number = req.params.unique_key;
    const cur_time: string = datetime.ISODateString(new Date());

    const folder = new GroupFolders();
    let update_args = {modified_at: cur_time};

    let queryResult = await folder.update(folder_id, update_args);

    if (queryResult instanceof ErrorResult) {
        result = new Result(queryResult.errCode, null);
    } else {
        result = new Result(ErrorCode.None, null);
    }

    return result;
}

export async function deleteFolder(req: express.Request, res: express.Response) {

}