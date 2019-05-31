import express from "express";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";
import logger from "@utils/logger"

const error_handler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err);
    let result = new Result(ErrorCode.Internal, null);
    result.send_to(res);
}

export default error_handler;