export interface EntityAttrs {
    id: number
    name: string
    url: string
    thumbnail_url? : string
    is_tab?: boolean
    is_public: boolean
    version: number
    modified_at: string
    owner_id: number
    parent_id: number
    drive_id: number
}

export default EntityAttrs;