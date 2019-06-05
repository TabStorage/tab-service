import express, { Router } from "express";
import async_handler from "express-async-handler";
import { UserRootController } from "@controllers/users/root";
import { Routable } from "@routes/routable";
import { login_required } from "@utils/decorators/login_required";
import { admin_required } from "@utils/decorators/admin_required";

export class UserRootRouter implements Routable {
    private router: Router;
    private basePath: string;
    private userRootController: UserRootController;

    constructor() {
        this.basePath = "/user/root";
        this.router = express.Router();
        this.userRootController = new UserRootController();

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.basePath, async_handler(this.get.bind(this)));
        this.router.post(this.basePath, async_handler(this.post.bind(this)));
        this.router.delete(this.basePath, async_handler(this.delete.bind(this)));
    }

    @login_required()
    @admin_required()
    async get(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userRootController.getRoot(req);
        result.send_to(res);
    }

    @login_required()
    @admin_required()
    async post(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userRootController.createRoot(req);
        result.send_to(res);
    }

    @login_required()
    @admin_required()
    async delete(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userRootController.deleteRoot(req);
        result.send_to(res);
    }

    public routes(): Router {
        return this.router;
    }
}

export default UserRootRouter;