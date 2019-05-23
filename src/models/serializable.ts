export interface SerializeFunc<T> {
    (): object
}

export interface Serializable<T> {
    // for marshaling white list
    white_list: Array<keyof T>

    toJSON: SerializeFunc<T>
}