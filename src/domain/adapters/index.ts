import { cast, uncast } from './casting'
import { arrayItem, m, o, r, union } from './type-maps/functions'
import type { Post } from '../models/types'

export interface Entry {
  posts?: Post[]
}

export abstract class Convert<T> {
  constructor(protected entity: string) {}

  public parseEntity(json: string): T {
    return cast(JSON.parse(json), r(this.entity))
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
