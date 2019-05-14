import express from "express";
import * as controller from "../controllers/folders";

let folderRouter = express.Router();

// for test
folderRouter.get("/:unique_key", (req, res, next) => {
    controller.getFolder(req, res);
});

folderRouter.post("/:unique_key", (req, res, next) => {
});

folderRouter.delete("/:unique_key", (req, res, next) => {

});

// for test
folderRouter.get("/test/:unique_key", (req, res, next) => {
    controller.setFolder(req, res);
});

export default folderRouter;