import express from "express";
import async_handler from "express-async-handler";
import * as controller from "../controllers/folders";
import unique_key_parser from "../middlewares/unique_key_parser";

let folderRouter = express.Router();

folderRouter.param('unique_key', unique_key_parser)

folderRouter.get("/:unique_key", async_handler(async (req, res, next) => {
    const result = await controller.getFolder(req, res);
    result.send_to(res);
}));

folderRouter.post("/:unique_key", async_handler(async (req, res, next) => {
    controller.setFolder(req, res);
}));

folderRouter.delete("/:unique_key", async_handler(async (req, res, next) => {
    controller.deleteFolder(req, res);
}));

folderRouter.put("/:unique_key", async_handler(async (req, res, next) => {
    controller.setFolder(req, res);
}));

export default folderRouter;