import express from "express";
import async_handler from "express-async-handler";
import { getRoot } from "@controllers/users/root";

let userRootRouter = express.Router();

userRootRouter.get("/", async_handler(async (req, res, next) => {
    let result = await getRoot(req, res);
    result.send_to(res);
}));

export default userRootRouter;