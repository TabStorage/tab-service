import express from "express";
import ErrorCode from "@utils/error_code";

interface ResponsableObject {
    error_code: number
    data: any
}

class Result {
    constructor(error_code: ErrorCode, data: any) { 
        this.error_code = error_code;
        this.status_code = ErrorCode.toStatusCode(error_code);
        console.log(this.error_code)
        console.log(this.status_code);
        this.data = data;
    }

    error_code: ErrorCode
    status_code: number
    data: any

    send_to = (res: express.Response) => {
        const response: ResponsableObject = { data: this.data, error_code: this.error_code};
        res.status(this.status_code).json(JSON.stringify(response));
    }
}

export default Result;