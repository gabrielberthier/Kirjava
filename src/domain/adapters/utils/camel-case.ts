import { isObject, isString } from '$services/utils/is'

export const toCamelCase = (str = '') => {
  const [first = '', ...rest] = str.split('_')
  return (
    first.toLowerCase() +
    rest
      .map((word) => {
        word = word.toLowerCase()
        return word.slice(0, 1).toUpperCase() + word.slice(1)
      })
      .join('')
  )
}

type objectWithStringKeys = {
  [key: string]: any
}

export function objectToCamelCase(obj: unknown): unknown {
  if (!isObject(obj)) {
    throw new Error('Unsupported element')
  }
  if (Array.isArray(obj)) {
    return obj.map((entry) => {
      if (entry && typeof entry === 'object') return objectToCamelCase(entry)
      return entry
    })
  }
  const newObj = Object.entries(obj as object).reduce((obj, [key, value]) => {
    if (isString(key)) {
      obj[toCamelCase(key)] = value && isObject(value) ? objectToCamelCase(value) : value
    }

    return obj
  }, {} as objectWithStringKeys)
  return newObj
}
