export type Resource<T> = {
    data?: T,
    error?: Error,
    pending: boolean,
}

export type Collection<T> = {
    data: T[],
    error?: Error,
    pending: boolean,
}