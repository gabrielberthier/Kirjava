import type { Post } from '../models/types'
import { plainToInstance } from 'class-transformer'
import { objectToCamelCase } from './utils/camel-case'
import { MetaClass } from '$domain/models/meta'

export class Entry {
  posts: Post[] = [];
  meta?: MetaClass = new MetaClass;
}

type Constructor<T = {}> = new (...args: any[]) => T

export abstract class Convert<T> {
  constructor(protected destinationConstructor: Constructor<T>) {}

  public parseEntityFromJson(json: string): T {
    const jsonObject = JSON.parse(json)    

    const jsonObjectToCamel = objectToCamelCase(jsonObject)

    return this.parseEntity(jsonObjectToCamel)
  }

  public parseEntity(json: object): T {
    return plainToInstance(this.destinationConstructor, json)
  }

  public entryToJson(value: T): string {
    return JSON.stringify(value)
  }
}

export class PostsEntryAdapter extends Convert<Entry> {
  constructor() {
    super(Entry)
  }
}
