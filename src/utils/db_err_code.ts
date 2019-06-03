import ErrorCode from "@utils/error_code";
import { ErrorResult } from "@utils/error_result";
import logger from "./logger";

enum DBErrCode {
    ER_DUP_ENTRY = 1062,
}

namespace DBErrCode {
    export function toErrorResult(err: any): ErrorResult {
        const db_err_code: DBErrCode = err.errno;
        switch (db_err_code) {
            case DBErrCode.ER_DUP_ENTRY:
                return new ErrorResult(ErrorCode.Duplicated);

            default:
                logger.error(err);
                return new ErrorResult(ErrorCode.Internal);
        }
    }
}

export default DBErrCode;