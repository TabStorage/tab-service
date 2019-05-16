import express from "express";
import Folders from "../models/folders";
import * as datetime from "../utils/datetime";
import * as special from "../utils/special";
import Result from "../result";
import ErrorCode from "../error_code";

export async function createFolder(req: express.Request, res: express.Response) {

}

export async function getFolder(req: express.Request, res: express.Response) {
    const root_id: number = req.context.get("root_id");
    const folder_id: number = req.context.get("target_id");
    const version: number = req.context.get("version");

    let result: Result;

    let folder = new Folders();
    const is_success = await folder.get(folder_id);
    if (is_success) {
        result = new Result(ErrorCode.None, 200, folder);
    } else {
        result = new Result(ErrorCode.Inexists, 404, null);
    }

    return result;
}

export async function setFolder(req: express.Request, res: express.Response) {
    const folder_id: number = req.params.unique_key;
    const cur_time: string = datetime.ISODateString(new Date());

    const folder = new Folders();
    folder.id = folder_id;

    let update_args = {modified_at: cur_time};

    folder.update(update_args).then(isSuccess => {
        if (!isSuccess) {
            res.send("error!");
            return;
        }

        res.send(folder);
    });
}

export async function deleteFolder(req: express.Request, res: express.Response) {

}