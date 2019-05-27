import { DefaultModel } from "@models/default_model";

export class UserRootAttrs {
    public constructor(init?: Partial<UserRootAttrs>) {
        Object.assign(this, init);
    }

    table: string = "user_root";

    id: number;
    user_id: number;
}

export class Roots extends DefaultModel<UserRootAttrs> {
    public constructor(attrs?: UserRootAttrs) {
        let white_list = ["id"];
        if (attrs != undefined)
            super(attrs, white_list);
        else
            super(new UserRootAttrs(), white_list);
    }
}