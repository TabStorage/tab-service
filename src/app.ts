import express from "express";
import createError from "http-errors";
import logger from "morgan";
import async_handler from "express-async-handler";

import pool from "./db_pool";
import Context from "./context";

import tabRouter from "./routes/tabs";
import folderRouter from "./routes/folders";

const port = process.env.port || 80;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add context per request
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.context = new Context();
    next();
})

app.use("/", tabRouter);
app.use("/folders", folderRouter);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
});

app.listen(port, () => {
    console.log( `server started at http://localhost:${port}` );
} );