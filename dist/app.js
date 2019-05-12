"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const db_pool_1 = __importDefault(require("./db_pool"));
const tabs_1 = __importDefault(require("./routes/tabs"));
const folders_1 = __importDefault(require("./routes/folders"));
const port = process.env.port || 80;
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
async function db_test() {
    try {
        const connection = await db_pool_1.default.getConnection();
        try {
            const [rows, fields] = await connection.query("SELECT 1 + 1 AS solution");
            console.log(`rows: ${rows}, fields: ${fields}`);
            return [rows, fields];
        }
        catch (err) {
            console.log("Query Error");
            return [null, null];
        }
        finally {
            connection.release();
        }
    }
    catch (err) {
        console.log('DBError');
        return [null, null];
    }
}
app.use("/test", function (req, res, next) {
    db_test().then(result => {
        console.log(result);
        res.send(result);
    });
});
app.use("/", tabs_1.default);
app.use("/folders", folders_1.default);
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map