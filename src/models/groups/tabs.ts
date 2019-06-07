import { EntityAttrs } from "@models/entity";
import { DefaultModel } from "@models/default_model";

// TODO: add profer validation

export class GroupTabAttrs implements EntityAttrs {
    public constructor(init?:Partial<GroupTabAttrs>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    url: string;
    parent_id: number;
    drive_id: number;
    is_public: boolean;
    version: number;
    modified_at: string;
    owner_id: number;

    is_tab: boolean = false;
}

export class UserTabs extends DefaultModel<GroupTabAttrs> {
    public constructor(attrs?: GroupTabAttrs) {
        let white_list = 
            ["id", "name", "url", "owner_id", "is_public", "version", "modified_at"];

        if (attrs != undefined)
            super(attrs, "group_entity", white_list);
        else
            super(new GroupTabAttrs(), "group_entity", white_list);
    }
}