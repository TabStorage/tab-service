import express, { Router } from "express";
import async_handler from "express-async-handler";
import unique_key_parser from "@middlewares/unique_key_parser";
import { Routable } from "@routes/routable";
import UserTabController from "@controllers/users/tabs";
import { login_required } from "@utils/decorators/login_required";

class UserTabRouter implements Routable {
    private basePath: string;
    private router: Router;
    private userTabController: UserTabController;

    constructor() {
        this.basePath = "/user/tabs";
        this.router = express.Router();
        this.userTabController = new UserTabController();

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

    public routes(): Router {
        return this.router;
    }

    async get(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userTabController.getTab(req);
        result.send_to(res);
    }

    @login_required()
    async post(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userTabController.createTab(req);
        result.send_to(res);
    }

    @login_required()
    async delete(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userTabController.deleteTab(req);
        result.send_to(res);
    }

    @login_required()
    async put(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userTabController.setTab(req);
        result.send_to(res);
    }
}

export default UserTabRouter;