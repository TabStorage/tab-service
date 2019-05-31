import { EntityAttrs } from "@models/entity";
import { DefaultModel } from "@models/default_model";

// TODO: add profer validation

export class GroupFolderAttrs implements EntityAttrs {
    public constructor(init?:Partial<GroupFolderAttrs>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    // used for tab stroage link
    url: string;
    parent_id: number;
    root_id: number;
    is_public: boolean;
    version: number;
    modified_at: string;
    owner_id: number;

    is_tab: boolean = false;
}

export class GroupFolders extends DefaultModel<GroupFolderAttrs> {
    public constructor(attrs?: GroupFolderAttrs) {
        let white_list = 
            ["id", "name", "url", "owner_id", "is_public", "version", "modified_at"];

        if (attrs != undefined)
            super(attrs, "group_entity", white_list);
        else
            super(new GroupFolderAttrs(), "group_entity", white_list);
    }
}