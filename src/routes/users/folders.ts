import express from "express";
import async_handler from "express-async-handler";
import { getFolder, createFolder, deleteFolder, setFolder } from "@controllers/users/folders";
import unique_key_parser from "@middlewares/unique_key_parser";

let userFolderRouter = express.Router();

userFolderRouter.param('unique_key', unique_key_parser);

userFolderRouter.get("/:unique_key", async_handler(async (req, res, _next) => {
    const result = await getFolder(req);
    result.send_to(res);
}));

userFolderRouter.post("/:unique_key", async_handler(async (req, res, _next) => {
    const result = await createFolder(req);
    result.send_to(res);
}));

userFolderRouter.delete("/:unique_key", async_handler(async (req, res, _next) => {
    const result = await deleteFolder(req);
    result.send_to(res);
}));

userFolderRouter.put("/:unique_key", async_handler(async (req, res, _next) => {
    const result = await setFolder(req);
    result.send_to(res);
}));

export default userFolderRouter;