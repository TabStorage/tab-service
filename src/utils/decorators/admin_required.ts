import express from "express";
import { TokenSchema } from "@middlewares/token_validator";
import Result from "@utils/result";
import ErrorCode from "@utils/error_code";

export function admin_required() {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(... params: any[]) => Promise<any>>) => {
        const originMethod = descriptor.value;
        descriptor.value = async function() {
            let token: TokenSchema = arguments[0].context.get("token");
            if (token.role !== "admin") {
                const res: express.Response = arguments[0].res;
                const result = new Result(ErrorCode.InvalidToken, null);
                result.send_to(res);
                return;
            } else {
                return await originMethod.apply(this, arguments);
            }
        };
    };
}