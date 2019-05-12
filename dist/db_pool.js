"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "tabstorage",
    database: "tab_service"
});
exports.default = pool;
//# sourceMappingURL=db_pool.js.map