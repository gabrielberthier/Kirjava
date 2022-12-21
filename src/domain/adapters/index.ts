import { cast, uncast } from './casting'
import { r } from './type-maps/functions'
import type { Post } from '../models/types'

export interface Entry {
  posts: Post[]
}

export abstract class Convert<T> {
  constructor(protected entity: string) {}

  public parseEntityFromJson(json: string): T {
    const jsonObject = JSON.parse(json)

    console.log(jsonObject);
    
    return cast(jsonObject, r(this.entity))
  }

  public parseEntity(json: object): T {
    return cast(json, r(this.entity))
  }

  public entryToJson(value: T): string {
    return JSON.stringify(uncast(value, r(this.entity)), null, 2)
  }
}

export class PostsEntryAdapter extends Convert<Entry> {
  constructor() {
    super('Entry')
  }
}
