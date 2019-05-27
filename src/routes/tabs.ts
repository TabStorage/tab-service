import express from "express";
import async_handler from "express-async-handler";
import unique_key_parser from "@middlewares/unique_key_parser";

let tabRouter = express.Router();

tabRouter.param('unique_key', unique_key_parser);

tabRouter.get("/:unique_key", async_handler(async (req, res, next) => {

}));

tabRouter.post("/:unique_key", async_handler(async (req, res, next) => {

}));

tabRouter.put("/:unique_key", async_handler(async (req, res, next) => {

}));

tabRouter.delete("/:unique_key", async_handler(async (req, res, next) => {

}));

export default tabRouter;