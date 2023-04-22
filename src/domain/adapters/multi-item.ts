import { isString } from '$services/utils/is'
import { AbstractConverter } from './interfaces'
import { objectToCamelCase } from './utils/camel-case'
import type { AnyZodObject } from 'zod'

export class MultiItemConverter<T extends Array<object>> extends AbstractConverter<T> {
  constructor(private schema: AnyZodObject) {
    super()
  }

  parseEntity(json: string | object | object[]): T {
    if (isString(json)) {
      json = JSON.parse(String(json))
    }

    if (Array.isArray(json)) {
      const parsedData = json.map((item) => this.validateFormData(this.schema, item, true))

      return parsedData as T
    }

    throw new Error(
      `${json} should be an instance of Array, but type ${typeof json} was given.`
    )
  }
}
