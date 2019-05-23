import { Storable } from "@models/storable";

export interface CreateFunc<T> {
    (obj: T): Promise<T | Error>
}

export interface GetFunc<T> {
    (): Promise<T | Error>
}

export interface GetAllFunc<T> {
    (obj_list: Array<T>): Promise<Array<T> | Error>
}

export interface UpdateFunc<T> {
    (obj: T, args: object): Promise<T | Error>
}

export interface DeleteFunc<T> {
    (obj: T): Promise<Error>
}

export interface Queryable<T extends Storable> {
    create: CreateFunc<T>
    get: GetFunc<T>
    getAll: GetAllFunc<T>
    update: UpdateFunc<T>
    delete: DeleteFunc<T>
}