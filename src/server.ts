import App from "./app";
import UserRootRouter from "@routes/users/root";
import UserFolderRouter from "@routes/users/folders";

const app = new App(
    [
        new UserRootRouter(),
        new UserFolderRouter(),
    ]
);

app.listen();