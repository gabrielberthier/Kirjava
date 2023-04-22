export const removeTrailingSlash = (str: string) => str.replace(/^\/|\/$/g, '')

export const getFlagEmoji = (countryCode: string) =>
  String.fromCodePoint(
    ...[...(countryCode.split('-').pop() ?? '').toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt(0))
  )
