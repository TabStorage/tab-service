enum ErrorCode {
    None = 0,
    Inexists = 1,
    Internal = 2,
    InvalidToken = 3,
    Duplicated = 4,
    Empty = 5,
    Invalid = 6,
}

namespace ErrorCode {
    export function toString(errorCode: ErrorCode): string {
        return ErrorCode[errorCode];
    }

    export function toStatusCode(errorCode: ErrorCode): number {
        switch (errorCode) {
            case ErrorCode.None:
                return 200;

            case ErrorCode.Duplicated:
            case ErrorCode.Empty:
            case ErrorCode.Invalid:
                return 400;

            case ErrorCode.InvalidToken:
                return 401;

            case ErrorCode.Inexists:
                return 404;

            case ErrorCode.Internal:
                return 500;

            default:
                return 500;
        }
    }
}

export default ErrorCode;