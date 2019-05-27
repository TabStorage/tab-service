import express from "express";
import async_handler from "express-async-handler";
import * as controller from "@controllers/groups/folders";
import unique_key_parser from "@middlewares/unique_key_parser";

let groupFolderRouter = express.Router();

groupFolderRouter.param('unique_key', unique_key_parser);

groupFolderRouter.get("/:unique_key", async_handler(async (req, res, next) => {
    const result = await controller.getFolder(req, res);
    result.send_to(res);
}));

groupFolderRouter.post("/:unique_key", async_handler(async (req, res, next) => {
    controller.setFolder(req, res);
}));

groupFolderRouter.delete("/:unique_key", async_handler(async (req, res, next) => {
    controller.deleteFolder(req, res);
}));

groupFolderRouter.put("/:unique_key", async_handler(async (req, res, next) => {
    controller.setFolder(req, res);
}));

export default groupFolderRouter;