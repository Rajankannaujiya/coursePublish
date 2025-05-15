export type ReturnTypeUser<T> = {
    success:boolean,
    error:boolean,
    message?:string,
    status:number,
    data?:T
}