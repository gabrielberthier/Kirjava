export function addTimezoneOffset(date: string | Date) {
  const offsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000
  return new Date(new Date(date).getTime() + offsetInMilliseconds)
}

export function dateRange(input: string | Date, target: Date = new Date()) {
  const inputDate = new Date(input)

  return (target.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
}
