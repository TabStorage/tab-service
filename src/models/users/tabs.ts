import { EntityAttrs } from "@models/entity";
import { DefaultModel } from "@models/default_model";

// TODO: add profer validation

export class UserTabAttrs implements EntityAttrs {
    public constructor(init?:Partial<UserTabAttrs>) {
        Object.assign(this, init);
    }

    table: string = "user_entity";

    id: number;
    name: string;
    url: string;
    parent_id: number;
    root_id: number;
    is_public: boolean;
    version: number;
    modified_at: string;
    owner_id: number;

    is_tab: boolean = false;
}

export class UserTabs extends DefaultModel<UserTabAttrs> {
    public constructor(attrs?: UserTabAttrs) {
        let white_list = 
            ["id", "name", "url", "owner_id", "is_public", "version", "modified_at"];

        if (attrs != undefined)
            super(attrs, "user_entity", white_list);
        else
            super(new UserTabAttrs(), "user_entity", white_list);
    }
}