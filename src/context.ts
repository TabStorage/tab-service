import express from "express";

class Context {
    constructor() { }

    set<T>(key: string, value: T) {
        this.key = value;
    }

    get<T>(key: string): T {
        return this.key;
    }

    [key: string]: any
}

declare global {
    namespace Express {
        interface Request {
            context: Context
        }
    }
}

export default Context;