import { DefaultModel } from "@models/default_model";

export class UserDriveAttrs {
    public constructor(init?: Partial<UserDriveAttrs>) {
        Object.assign(this, init);
    }

    id: number;
    user_id: number;
}

export class Drives extends DefaultModel<UserDriveAttrs> {
    public constructor(attrs?: UserDriveAttrs) {
        let white_list = ["id"];
        if (attrs != undefined)
            super(attrs, "user_drive", white_list);
        else
            super(new UserDriveAttrs(), "user_drive", white_list);
    }
}