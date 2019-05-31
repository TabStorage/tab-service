import ErrorCode from "@utils/error_code";

export interface CreateFunc<T> {
    (): Promise<T | ErrorCode>
}

export interface GetFunc<T> {
    (id: number): Promise<T | ErrorCode>
}

export interface GetAllFunc<T> {
    (obj_list: Array<T>): Promise<Array<T> | ErrorCode>
}

export interface UpdateFunc<T> {
    (obj: T, args: object): Promise<T | ErrorCode>
}

export interface DeleteFunc {
    (key: Object): Promise<ErrorCode>
}

export interface RawQueryFunc {
    (query: string): Promise<Array<object> | ErrorCode>
}

export interface Queryable<T> {
    create: CreateFunc<T>
    get: GetFunc<T>
    getAll: GetAllFunc<T>
    update: UpdateFunc<T>
    delete: DeleteFunc
    query: RawQueryFunc
}