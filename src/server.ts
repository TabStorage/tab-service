import App from "./app";
import UserRootRouter from "@routes/users/root";
import UserFolderRouter from "@routes/users/folders";
import UserTabRouter from "@routes/users/tabs";

const app = new App(
    [
        new UserRootRouter(),
        new UserFolderRouter(),
        new UserTabRouter(),
    ]
);

app.listen();