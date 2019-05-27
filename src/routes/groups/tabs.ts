import express from "express";
import async_handler from "express-async-handler";
import unique_key_parser from "@middlewares/unique_key_parser";

let groupTabRouter = express.Router();

groupTabRouter.param('unique_key', unique_key_parser);

groupTabRouter.get("/:unique_key", async_handler(async (req, res, next) => {

}));

groupTabRouter.post("/:unique_key", async_handler(async (req, res, next) => {

}));

groupTabRouter.put("/:unique_key", async_handler(async (req, res, next) => {

}));

groupTabRouter.delete("/:unique_key", async_handler(async (req, res, next) => {

}));

export default groupTabRouter;