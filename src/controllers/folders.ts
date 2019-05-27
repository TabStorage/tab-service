import express from "express";
import { Folders, FolderAttrs } from "@models/folders";
import * as datetime from "@utils/datetime";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";

export async function createFolder(req: express.Request, res: express.Response) {

}

export async function getFolder(req: express.Request, res: express.Response) {
    const root_id: number = req.context.get("root_id");
    const folder_id: number = req.context.get("target_id");
    const version: number = req.context.get("version");

    let result: Result;

    let folder = new Folders(new FolderAttrs({id: folder_id}));
    const folderAttrs = await folder.get();
    if (folderAttrs instanceof Error) {
        result = new Result(ErrorCode.Inexists, 404, null);
    } else {
        result = new Result(ErrorCode.None, 200, folder);
    }

    return result;
}

export async function setFolder(req: express.Request, res: express.Response) {
    const folder_id: number = req.params.unique_key;
    const cur_time: string = datetime.ISODateString(new Date());

    const folder = new Folders();
    folder.attrs.id = folder_id;

    let update_args = {modified_at: cur_time};

    folder.update(folder.attrs, update_args).then(isSuccess => {
        if (!isSuccess) {
            res.send("error!");
            return;
        }

        res.send(folder);
    });
}

export async function deleteFolder(req: express.Request, res: express.Response) {

}