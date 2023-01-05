export const siblingfy = <T>(element: T, index: number, all: T[]) => ({
  ...element,
  next: all[index - 1],
  previous: all[index + 1]
})

export function addTimezoneOffset(date: string | Date) {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000
  return new Date(new Date(date).getTime() + offsetInMilliseconds)
}

export const isObject = (el: any): el is object => typeof el === 'object' && el !== null

export function isString(x: any): x is string {
  return typeof x === 'string'
}

export function isNumber(x: any): x is number {
  return typeof x === 'number'
}

export const removeTrailingSlash = (str: string) => str.replace(/^\/|\/$/g, '')

export function dateRange(input: string | Date, target: Date = new Date()) {
  const inputDate = new Date(input)

  return (target.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
}

export const getFlagEmoji = (countryCode: string) =>
  String.fromCodePoint(...[...(countryCode.split('-').pop() ?? "").toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0)))
