import { EntityAttrs } from "@models/entity";
import { DefaultModel } from "@models/default_model";

// TODO: add profer validation

export class UserFolderAttrs implements EntityAttrs {
    public constructor(init?:Partial<UserFolderAttrs>) {
        Object.assign(this, init);
    }

    id: number;
    name: string;
    // used for tab stroage link
    url: string;
    parent_id: number;
    drive_id: number;
    is_public: boolean;
    version: number;
    modified_at: string;
    owner_id: number;

    is_tab: boolean = false;
}

export class UserFolders extends DefaultModel<UserFolderAttrs> {
    public constructor(attrs?: UserFolderAttrs) {
        let white_list = 
            ["id", "name", "url", "owner_id", "is_public", "version", "modified_at"];

        if (attrs != undefined)
            super(attrs, "user_entity", white_list);
        else
            super(new UserFolderAttrs(), "user_entity", white_list);
    }
}