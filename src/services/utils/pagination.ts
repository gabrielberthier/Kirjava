interface PaginateOptions {
  page?: number
  limit?: number
}

export function paginate<T>(data: T[], paginateOptions: PaginateOptions): T[] {
  const { page = 1, limit } = paginateOptions

  if (limit) {
    return data.slice((page - 1) * limit, page * limit)
  }

  return data
}
