import { FolderAttrs } from "@models/folders";
import { DefaultModel } from "@models/default_model";

export class RootAttrs implements RootAttrs {
    public constructor(init?: Partial<FolderAttrs>) {
        Object.assign(this, init);
    }

    table: string = "root";

    id: number;

    owner_id: number;
}

export class Roots extends DefaultModel<RootAttrs> {
    public constructor(attrs?: RootAttrs) {
        let white_list = ["id"];
        if (attrs != undefined)
            super(attrs, white_list);
        else
            super(new RootAttrs(), white_list);
    }
}