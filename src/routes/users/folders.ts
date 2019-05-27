import express from "express";
import async_handler from "express-async-handler";
import * as controller from "@controllers/users/folders";
import unique_key_parser from "@middlewares/unique_key_parser";

let userFolderRouter = express.Router();

userFolderRouter.param('unique_key', unique_key_parser);

userFolderRouter.get("/:unique_key", async_handler(async (req, res, next) => {
    const result = await controller.getFolder(req, res);
    result.send_to(res);
}));

userFolderRouter.post("/:unique_key", async_handler(async (req, res, next) => {
    controller.setFolder(req, res);
}));

userFolderRouter.delete("/:unique_key", async_handler(async (req, res, next) => {
    controller.deleteFolder(req, res);
}));

userFolderRouter.put("/:unique_key", async_handler(async (req, res, next) => {
    controller.setFolder(req, res);
}));

export default userFolderRouter;