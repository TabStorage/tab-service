interface FromDBFunc {
    (id: number): Promise<boolean>
}

interface ToDBFunc {
    (): Promise<boolean>
}

interface Entity {
    id: number
    name: string
    url: string
    modified_time: string
    thumbnail_url?: string
    //todo: add owner info
    from_db_func: FromDBFunc
    to_db_func: ToDBFunc
}

export default Entity;