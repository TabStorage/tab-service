"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folders_1 = __importDefault(require("../models/folders"));
let folderRouter = express_1.default.Router();
// for test
folderRouter.get("/1", (req, res, next) => {
    const folder = new folders_1.default();
    folder.from_db_func(1).then(isSuccess => {
        if (!isSuccess) {
            res.send("error!");
            return;
        }
        console.log(`Router: ${folder}`);
        res.send(folder);
    });
});
exports.default = folderRouter;
//# sourceMappingURL=folders.js.map