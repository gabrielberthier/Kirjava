import type { AnyZodObject, z } from 'zod'
import { objectToCamelCase } from './utils/camel-case'

export interface Converter<T> {
  parseEntity(json: string | object | object[]): T
}

export abstract class AbstractConverter<T> implements Converter<T> {
  abstract parseEntity(json: string | object | object[]): T

  validateFormData<S extends AnyZodObject>(
    Schema: S,
    obj: any,
    forceCammelCase: boolean = false
  ): z.infer<S> {
    try {
      if (forceCammelCase) {
        obj = objectToCamelCase(obj)
      }

      return Schema.parse(obj)
    } catch (error) {
      console.error(error)
      throw new Error('Sorry, wrong Schema passed')
    }
  }
}
