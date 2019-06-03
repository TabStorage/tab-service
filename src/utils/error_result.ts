import ErrorCode from "@utils/error_code";

export class ErrorResult {
    private _errCode: ErrorCode;
    private _meta: Object;

    get errCode(): ErrorCode {
        return this._errCode;
    }

    get meta(): Object {
        return this._meta;
    }

    constructor(errCode: ErrorCode, meta: Object = null) {
        this._errCode = errCode;
        this._meta = meta;
    }
}