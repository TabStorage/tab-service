import express from "express";
import Folders from "../models/folders";
import * as datetime from "../utils/datetime";

export function createFolder(req: express.Request, res: express.Response) {

}

export function getFolder(req: express.Request, res: express.Response) {
    const folder = new Folders();
    // temporary
    const folder_id = req.params.unique_key;
    //console.log(req.params.unique);
    folder.get(folder_id).then(isSuccess => {
        if (!isSuccess) {
            res.send("error!")
            return;
        }

        res.send(folder);
    });
}

export function setFolder(req: express.Request, res: express.Response) {
    // TODO: add validator

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

export function deleteFolder(req: express.Request, res: express.Response) {

}