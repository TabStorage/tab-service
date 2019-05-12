import express from "express";
import Folders from "../models/folders";

export function getFolder(req: express.Request, res: express.Response) {
    const folder = new Folders();
    // temporary
    const folder_id = req.params.unique_key;
    //console.log(req.params.unique);
    folder.from_db_func(folder_id).then(isSuccess => {
        if (!isSuccess) {
            res.send("error!")
            return;
        }

        console.log(`Router: ${folder.name}`);

        res.send(folder);
    });
}