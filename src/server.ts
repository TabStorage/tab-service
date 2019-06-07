import App from "./app";
import UserDriveRouter from "@routes/users/drive";
import UserFolderRouter from "@routes/users/folders";
import UserTabRouter from "@routes/users/tabs";

const app = new App(
    [
        new UserDriveRouter(),
        new UserFolderRouter(),
        new UserTabRouter(),
    ]
);

app.listen();