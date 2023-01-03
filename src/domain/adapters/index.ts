import { isObject, isString } from '$services/utils/functions'
import { plainToInstance } from 'class-transformer'
import { objectToCamelCase } from './utils/camel-case'

export type Constructor<T = {} | []> = new (...args: any[]) => T

export interface Convert<T> {
  parseEntity(json: string | object | object[]): T
  entryToJson(value: T): string
}

export type GetElementType<T extends Array<Object>> = T extends (infer U)[] ? U : T

function isOfArrayType<T extends object[]>(
  array: any,
  constructor: Constructor<GetElementType<T>>
): array is T {
  return Array.isArray(array) && array[0] instanceof constructor
}

export class MultiItemConverter<T extends Array<object>> implements Convert<T> {
  constructor(protected destinationConstructor: Constructor<GetElementType<T>>) {}

  parseEntity(json: string | object[]): T {
    if (isString(json)) {
      json = JSON.parse(String(json))
    }
    if (Array.isArray(json)) {
      const jsonResponse = objectToCamelCase(json)

      const instances = plainToInstance(this.destinationConstructor, jsonResponse)

      if (isOfArrayType(instances, this.destinationConstructor)) {
        return instances
      }
    }

    throw new Error(`${json} should be an instance of Array, but type ${typeof json} was given.`)
  }
  entryToJson(value: T): string {
    return JSON.stringify(value)
  }
}

export class Converter<T extends Object> implements Convert<T> {
  constructor(protected destinationConstructor: Constructor<T>) {}

  parseEntityFromJson(json: string): T {
    const jsonObject = JSON.parse(json)

    const jsonObjectToCamel = objectToCamelCase(jsonObject)

    return this.parseEntity(jsonObjectToCamel)
  }

  parseEntity(json: string | object): T {
    if (isString(json)) {
      json = JSON.parse(String(json))
    }
    if (Array.isArray(json)) {
      throw new Error(
        `${json} should be an instance of Object or String, but type array was given. Consider using MultiItemConverter instead`
      )
    }
    if (isObject(json)) {
      json = objectToCamelCase(json)
      return plainToInstance(this.destinationConstructor, json)
    }

    throw new Error(
      `${json} should be an instance of Object or String, but type ${typeof json} given`
    )
  }

  public entryToJson(value: T): string {
    return JSON.stringify(value)
  }
}
