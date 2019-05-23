export interface Modelable {
    // for table name
    table: string
    // for pk
    id: number
    // for marshaling white list
    white_list: Array<string>
}