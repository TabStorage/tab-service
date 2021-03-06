require('module-alias/register')

import express from "express";
import createError from "http-errors";
import logger, { token } from "morgan";

import request_context from "@middlewares/request_context";
import error_handler from "@middlewares/error_handler";
import token_validator from "@middlewares/token_validator";

import docsRouter from "@routes/api_docs";

import { Routable } from "@routes/routable";

class App {
    private readonly port = process.env.port || 80;
    public app: express.Application;
    private routers: Routable[];

    constructor(routers: Routable[]) {
        this.app = express();
        this.routers = routers;

        this.initializeMiddlewares();
        this.initializeRouters();
        this.initializeDefaultRouters();
    }

    private initializeMiddlewares(): void {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());

        // add context per request
        this.app.use(request_context);
        this.app.use(token_validator);
    }

    private initializeRouters(): void {
        this.routers.forEach(router => {
            this.app.use("/api", router.routes());
        });
        /*
        // User
        this.app.use("/api/user/root", new UserRootRouter().route);
        this.app.use("/api/user/tabs", userTabRouter);
        this.app.use("/api/user/folders", userFolderRouter);

        // Group
        this.app.use("/api/group/root", groupRootRouter);
        this.app.use("/api/group/tabs", groupTabRouter);
        this.app.use("/api/group/folders", groupFolderRouter);
        */
    }

    private initializeDefaultRouters(): void {
        if (this.app.get('env') === "development") {
            this.app.use("/", docsRouter);
        }

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            next(createError(404));
        });

        this.app.use(error_handler)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`server started at http://localhost:${this.port}`);
        } );
    }
}

export default App;