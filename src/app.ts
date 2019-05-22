import express from "express";
import createError from "http-errors";
import logger, { token } from "morgan";
import permanent_logger from "./utils/logger";

import request_context from "./middlewares/request_context";
import error_handler from "./middlewares/error_handler";
import token_validator from "./middlewares/token_validator";

import tabRouter from "./routes/tabs";
import folderRouter from "./routes/folders";
import docsRouter from "./routes/api_docs";

const port = process.env.port || 80;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// add context per request
app.use(request_context);
app.use(token_validator);

app.use("/api", tabRouter);
app.use("/api/folders", folderRouter);

if (app.get('env') === "development") {
    app.use("/", docsRouter);
}

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
});

app.use(error_handler);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
} );