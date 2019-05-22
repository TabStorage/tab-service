import express from "express";
import Context from "@utils/context";

function request_context(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.context = new Context();
    next();
}

export default request_context;