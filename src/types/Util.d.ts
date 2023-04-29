declare interface PageOptions {
  page?: number
  perPage?: number
  search?: string
}

declare interface Page<T> {
  count: number
  results: T[]
}
