import express from "express";
import async_handler from "express-async-handler";
import unique_key_parser from "@middlewares/unique_key_parser";

let userTabRouter = express.Router();

userTabRouter.param('unique_key', unique_key_parser);

userTabRouter.get("/:unique_key", async_handler(async (req, res, next) => {

}));

userTabRouter.post("/:unique_key", async_handler(async (req, res, next) => {

}));

userTabRouter.put("/:unique_key", async_handler(async (req, res, next) => {

}));

userTabRouter.delete("/:unique_key", async_handler(async (req, res, next) => {

}));

export default userTabRouter;