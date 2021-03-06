import { EntityAttrs } from "@models/entity";

/*
*   special link
*   base64($(root_id)_$(target_id)_$(version))
*/

export class MetaInfo {
    constructor() { };
    drive_id: number;
    target_id: number;
    version: number;
    has_err: boolean;
    err: any;
}

export function pack_key(entity: EntityAttrs): string {
    let packed_string = `${entity.drive_id}_${entity.id}_${entity.version}`;
    return Buffer.from(packed_string).toString('base64');
}

export function pack_key_with_raw(drive_id: number, target_id: number, version: number): string {
    let packed_string = `${drive_id}_${target_id}_${version}`;
    return Buffer.from(packed_string).toString('base64');
}

export function unpack_key(key: string): MetaInfo {
    let result = new MetaInfo();
    try {
        const packed_string = Buffer.from(key, 'base64').toString('utf8');
        let meta_arr: string[] = packed_string.split('_');

        if (meta_arr.length != 3) {
            result.has_err = true;
            result.err = new Error('Invalid params count');
            return result;
        }

        result.drive_id = parseInt(meta_arr[0]);
        result.target_id = parseInt(meta_arr[1]);
        result.version = parseInt(meta_arr[2]);

    } catch(err) {
        result.has_err = true;
        result.err = err;
    }

    return result;
}
