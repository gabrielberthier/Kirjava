export const siblingfy = <T>(element: T, index: number, all: T[]) => ({
  ...element,
  next: all[index - 1],
  previous: all[index + 1]
})

export function addTimezoneOffset(date: string | Date) {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000
  return new Date(new Date(date).getTime() + offsetInMilliseconds)
}

export const isObject = (el: any) => typeof el === 'object' && el !== null

export const removeTrailingSlash = (str: string) => str.replace(/^\/|\/$/g, '');