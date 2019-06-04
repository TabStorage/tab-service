import express, { Router } from "express";
import async_handler from "express-async-handler";
import { UserFolderController } from "@controllers/users/folders";
import unique_key_parser from "@middlewares/unique_key_parser";
import Result from "@utils/result";
import { login_required } from "@utils/decorators/login_required";
import { Routable } from "@routes/routable";

export class UserFolderRouter implements Routable {
    private router: Router;
    private basePath: string;
    private userFolderController: UserFolderController;

    constructor() {
        this.basePath = "/user/folders";
        this.router = express.Router();
        this.userFolderController = new UserFolderController();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.param('unique_key', unique_key_parser);

        const extendPath: string = this.basePath + "/:unique_key";

        this.router.get(extendPath, async_handler(this.get.bind(this)));
        this.router.post(this.basePath, async_handler(this.post.bind(this)));
        this.router.delete(extendPath, async_handler(this.delete.bind(this)));
        this.router.put(extendPath, async_handler(this.put.bind(this)));
    }

    async get(req: express.Request, res: express.Response, _next: express.NextFunction) {
        const result: Result = await this.userFolderController.getFolder(req)
        result.send_to(res);
    }

    @login_required()
    async post(req: express.Request, res: express.Response, _next: express.NextFunction) {
        const result = await this.userFolderController.createFolder(req);
        result.send_to(res);
    }

    @login_required()
    async delete(req: express.Request, res: express.Response, _next: express.NextFunction) {
        const result = await this.userFolderController.deleteFolder(req);
        result.send_to(res);
    }

    @login_required()
    async put(req: express.Request, res: express.Response, _next: express.NextFunction) {
        const result = await this.userFolderController.setFolder(req);
        result.send_to(res);
    }

    public routes(): Router {
        return this.router;
    }
}

export default UserFolderRouter;