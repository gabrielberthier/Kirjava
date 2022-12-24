import { Entry } from '$domain/models/posts-entry'
import { isObject, isString } from '$services/utils/functions'
import { plainToInstance } from 'class-transformer'
import { objectToCamelCase } from './utils/camel-case'

type Constructor<T = {} | []> = new (...args: any[]) => T

export interface Convert<T> {
  parseEntity(json: string | object | object[]): T
  entryToJson(value: T): string
}

type GetElementType<T extends Array<Object>> = T extends (infer U)[] ? U : T

export class MultiItemConverter<T extends Array<object>> implements Convert<T> {
  constructor(protected destinationConstructor: Constructor<GetElementType<T>>) {}

  parseEntity(json: string | object[]): T {
    if (isString(json)) {
      json = JSON.parse(String(json))
    }
    if (Array.isArray(json)) {
      const jsonResponse = objectToCamelCase(json)

      return plainToInstance(this.destinationConstructor, jsonResponse) as T
    }

    throw new Error(`${json} should be an instance of Array, but type ${typeof json} was given.`)
  }
  entryToJson(value: T): string {
    return JSON.stringify(value)
  }
}

export abstract class AbstractConverter<T> implements Convert<T> {
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
      json = objectToCamelCase(json as object)
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

export class PostsEntryAdapter extends AbstractConverter<Entry> {
  constructor() {
    super(Entry)
  }
}
