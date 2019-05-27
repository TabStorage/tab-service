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

export interface RawQueryFunc<T> {
    (query: string): Promise<Array<T> | Error>
}

export interface Queryable<T> {
    create: CreateFunc<T>
    get: GetFunc<T>
    getAll: GetAllFunc<T>
    update: UpdateFunc<T>
    delete: DeleteFunc<T>
    query: RawQueryFunc<T>
}