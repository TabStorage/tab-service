import { DefaultModel } from "@models/default_model";

export class GroupRootAttrs {
    public constructor(init?: Partial<GroupRootAttrs>) {
        Object.assign(this, init);
    }

    table: string = "user_root";

    id: number;
    user_id: number;
}

export class Roots extends DefaultModel<GroupRootAttrs> {
    public constructor(attrs?: GroupRootAttrs) {
        let white_list = ["id"];
        if (attrs != undefined)
            super(attrs, white_list);
        else
            super(new GroupRootAttrs(), white_list);
    }
}