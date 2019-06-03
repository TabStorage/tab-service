import ErrorCode from "@utils/error_code";
import { ErrorResult } from "@utils/error_result";

enum DBErrCode {
    ER_DUP_ENTRY = 1062,
}

namespace DBErrCode {
    export function toErrorResult(db_err_code: DBErrCode): ErrorResult {
        switch (db_err_code) {
            case DBErrCode.ER_DUP_ENTRY:
                return new ErrorResult(ErrorCode.Duplicated);

            default:
                return new ErrorResult(ErrorCode.Internal);
        }
    }
}

export default DBErrCode;