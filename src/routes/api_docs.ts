import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../config/swagger.json";

let docsRouter = express.Router();
docsRouter.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export default docsRouter;