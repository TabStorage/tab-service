import { ErrorResult } from "@utils/error_result";

export interface CreateFunc<T> {
    (): Promise<T | ErrorResult>
}

export interface GetFunc<T> {
    (id: number): Promise<T | ErrorResult>
}

export interface GetAllFunc<T> {
    (obj_list: Array<T>): Promise<Array<T> | ErrorResult>
}

export interface UpdateFunc<T> {
    (target_id: number, args: object): Promise<ErrorResult>
}

export interface DeleteFunc {
    (key: Object): Promise<ErrorResult>
}

export interface RawQueryFunc {
    (query: string): Promise<Array<object> | ErrorResult>
}

export interface Queryable<T> {
    create: CreateFunc<T>
    get: GetFunc<T>
    getAll: GetAllFunc<T>
    update: UpdateFunc<T>
    delete: DeleteFunc
    query: RawQueryFunc
}