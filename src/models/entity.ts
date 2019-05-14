interface CreateFunc {
    (): Promise<boolean>
}

interface GetFunc {
    (id: number): Promise<boolean>
}

interface UpdateFunc {
    (args: object): Promise<boolean>
}

interface DeleteFunc {
    (): Promise<boolean>
}

interface Entity {
    id: number
    name: string
    url: string
    thumbnail_url? : string
    is_tab?: boolean
    is_public: boolean
    version: number
    modified_at: string
    ownership_id: number

    create: CreateFunc
    get: GetFunc
    update: UpdateFunc
    delete: DeleteFunc
}

export default Entity;