import ErrorCode from "@utils/error_code";

export class ErrorResult {
    private _errCode: ErrorCode;
    private _meta: object;

    get errCode(): ErrorCode {
        return this._errCode;
    }

    get meta(): object {
        return this._meta;
    }

    constructor(errCode: ErrorCode, meta: object = null) {
        this._errCode = errCode;
        this._meta = meta;
    }
}