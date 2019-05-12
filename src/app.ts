import express from "express";
import createError from "http-errors";
import logger from "morgan";

import pool from "./db_pool";

import tabRouter from "./routes/tabs";
import folderRouter from "./routes/folders";

const port = process.env.port || 80;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function db_test(): Promise<[string, any]> {
    try {
        const connection = await pool.getConnection();
        try {
        const [rows, fields] = await connection.query("SELECT 1 + 1 AS solution");
        console.log(`rows: ${rows}, fields: ${fields}`);
        return [rows, fields];
        } catch(err) {
            console.log("Query Error");
            return [null, null];
        } finally {
            connection.release();
        }
    } catch (err) {
        console.log('DBError');
        return [null, null];
    }
}

app.use("/test", function(req, res, next) {
    db_test().then(result => {
        console.log(result);
        res.send(result);
    });
});

app.use("/", tabRouter);
app.use("/folders", folderRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.listen(port, () => {
    console.log( `server started at http://localhost:${port}` );
} );