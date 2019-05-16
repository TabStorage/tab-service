import express from "express";
import * as special from "../utils/special";

function unique_key_parser(req: express.Request, res: express.Response, next: express.NextFunction, unique_key: string) {
    let parse_info: special.MetaInfo = special.unpack_key(unique_key);

    if (parse_info.has_err) {
        next(parse_info.err);
    } else {
        req.context.set("root_id", parse_info.root_id);
        req.context.set("target_id", parse_info.target_id);
        req.context.set("version", parse_info.version);
        next();
    }
}

export default unique_key_parser;