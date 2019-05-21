import express from "express";
import Result from "../result";
import ErrorCode from "../error_code";
import logger from "../logger"

const error_handler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err);
    let result = new Result(ErrorCode.Internal, 500, null);
    result.send_to(res);
}

export default error_handler;