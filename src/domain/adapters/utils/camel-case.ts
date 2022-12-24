import { isObject } from '$services/utils/functions'

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

interface OB {
  [key: string]: any
}

export function objectToCamelCase(obj: OB): OB
export function objectToCamelCase(obj: OB[]): OB[]

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
    const newKey = typeof key === 'string' ? toCamelCase(key) : key
    let newValue = value
    if (value && typeof value === 'object') {
      newValue = objectToCamelCase(value)
    }
    obj[newKey] = newValue
    return obj
  }, {} as OB)
  return newObj
}
