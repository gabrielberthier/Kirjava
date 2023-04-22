import type { Constructor, GetElementType } from "../abstract-types"

export const isObject = (el: any): el is object => typeof el === 'object' && el !== null

export function isString(x: any): x is string {
  return typeof x === 'string'
}

export function isOfArrayType<T extends object[]>(
  array: any,
  constructor: Constructor<GetElementType<T>>
): array is T {
  return Array.isArray(array) && array[0] instanceof constructor
}

export function isNumber(x: any): x is number {
  return typeof x === 'number'
}
