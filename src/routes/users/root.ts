import express from "express";
import async_handler from "express-async-handler";
import { getRoot, createRoot, deleteRoot, setRoot } from "@controllers/users/root";

let userRootRouter = express.Router();

userRootRouter.get("/", async_handler(async (req, res, _next) => {
    let result = await getRoot(req);
    result.send_to(res);
}));

userRootRouter.post("/", async_handler(async (req, res, _next) => {
    let result = await createRoot(req);
    result.send_to(res);
}));

userRootRouter.delete("/", async_handler(async (req, res, _next) => {
    let result = await deleteRoot(req);
    result.send_to(res);
}))

userRootRouter.put("/", async_handler(async (req, res, _next) => {
    let result = await setRoot(req);
    result.send_to(res);
}))

export default userRootRouter;