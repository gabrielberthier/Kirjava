import type { AnyZodObject } from 'zod'
import { AbstractConverter } from './interfaces'
import { isObject, isString } from '$services/utils/is'

export class SingleItemConverter<T> extends AbstractConverter<T> {
  constructor(private schema: AnyZodObject) {
    super()
  }

  parseEntity(json: string | object | object[]): T {
    if (isString(json)) {
      json = JSON.parse(String(json))
    }

    if (isObject(json)) {
      try {
        this.validateFormData(this.schema, json, true)

        return json as T
      } catch (error) {
        console.error(error)
        throw new Error('Sorry, wrong Schema passed')
      }
    }

    throw new Error(
      `${json} should be an instance of Object or String, but type ${typeof json} was given.`
    )
  }
}
