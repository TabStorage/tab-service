import express, { Router } from "express";
import async_handler from "express-async-handler";
import { UserDriveController } from "@controllers/users/drive";
import { Routable } from "@routes/routable";
import { login_required } from "@utils/decorators/login_required";
import { admin_required } from "@utils/decorators/admin_required";

export class UserDriveRouter implements Routable {
    private router: Router;
    private basePath: string;
    private userDriveController: UserDriveController;

    constructor() {
        this.basePath = "/user/drive";
        this.router = express.Router();
        this.userDriveController = new UserDriveController();

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
        let result = await this.userDriveController.getRoot(req);
        result.send_to(res);
    }

    @login_required()
    @admin_required()
    async post(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userDriveController.createRoot(req);
        result.send_to(res);
    }

    @login_required()
    @admin_required()
    async delete(req: express.Request, res: express.Response, _next: express.NextFunction) {
        let result = await this.userDriveController.deleteRoot(req);
        result.send_to(res);
    }

    public routes(): Router {
        return this.router;
    }
}

export default UserDriveRouter;