import { DefaultModel } from "@models/default_model";

export class UserRootAttrs {
    public constructor(init?: Partial<UserRootAttrs>) {
        Object.assign(this, init);
    }

    id: number;
    user_id: number;
}

export class Roots extends DefaultModel<UserRootAttrs> {
    public constructor(attrs?: UserRootAttrs) {
        let white_list = ["id"];
        if (attrs != undefined)
            super(attrs, "user_root", white_list);
        else
            super(new UserRootAttrs(), "user_root", white_list);
    }
}