import express from "express";
import async_handler from "express-async-handler";
import { TokenSchema } from "@middlewares/token_validator";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";

let groupRootRouter = express.Router();

groupRootRouter.get("/", async_handler(async (req, res, next) => {
    let result: Result;
    let token: TokenSchema = req.context.get("token");
    if (token === null) {
        result = new Result(ErrorCode.InvalidToken, 401, null);
    } else {
    }

    result.send_to(res);
}));

export default groupRootRouter;