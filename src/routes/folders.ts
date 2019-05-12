import express from "express";
import Folders from "../models/folders";

let folderRouter = express.Router();

// for test
folderRouter.get("/1", (req, res, next) => {
    const folder = new Folders();
    folder.from_db_func(1).then(isSuccess => {
        if (!isSuccess) {
            res.send("error!")
            return;
        }

        console.log(`Router: ${folder}`);

        res.send(folder);
    });
});

export default folderRouter;