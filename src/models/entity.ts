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
    is_group: boolean
    version: number
    modified_at: string
    owner_id: number
    parent_id: number
    root_id: number

    create: CreateFunc
    get: GetFunc
    update: UpdateFunc
    delete: DeleteFunc
}

export default Entity;