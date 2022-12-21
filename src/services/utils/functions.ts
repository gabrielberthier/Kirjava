export const siblingfy = <T>(element: T, index: number, all: T[]) => ({
    ...element,
    next: all[index - 1],
    previous: all[index + 1]
  })