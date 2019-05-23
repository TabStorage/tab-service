export interface SerializeFunc<T> {
    (): object
}

export interface Serializable<T> {
    toJSON: SerializeFunc<T>
}