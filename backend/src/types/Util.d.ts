declare type SortOption = 'newest' | 'oldest'

declare interface PageOptions {
  page?: number
  perPage?: number
  search?: string
  sort?: SortOption
}

declare interface Page<T> {
  count: number
  results: T[]
}
