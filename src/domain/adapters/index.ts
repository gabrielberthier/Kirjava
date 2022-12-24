import { Entry } from '$domain/models/posts-entry'
import { isObject } from '$services/utils/functions'
import { plainToInstance } from 'class-transformer'
import { objectToCamelCase } from './utils/camel-case'

type Constructor<T = {} | []> = new (...args: any[]) => T

export interface Convert<T> {
  parseEntityFromJson(json: string): T
  parseEntity(json: object): T
  entryToJson(value: T): string
}

type GetElementType<T extends ({} | [])> = T extends (infer U)[] ? U :T

export abstract class AbstractConverter<T> implements Convert<T> {
  constructor(protected destinationConstructor: Constructor<T>) {}

  parseEntityFromJson(json: string): T {
    const jsonObject = JSON.parse(json)

    const jsonObjectToCamel = objectToCamelCase(jsonObject)

    return this.parseEntity(jsonObjectToCamel)
  }

  parseEntity(json: object): T {
    if (Array.isArray(json) || isObject(json)) {
      return plainToInstance(this.destinationConstructor, json)
    }

    throw new Error('Object should be an instance of Array or Object')
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
