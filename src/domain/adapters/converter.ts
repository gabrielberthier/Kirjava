import type { AnyZodObject, z } from 'zod'
import { objectToCamelCase } from "./utils/camel-case"
import { isObject, isString } from "$services/utils/is"
import type { Converter } from "./interfaces"

export class ConverterImplementation<T> implements Converter<T> {
    constructor(private schema: AnyZodObject) {}
  
    parseEntity(json: string | object | object[]): T {
      if (isString(json)) {
        json = JSON.parse(String(json))
      }
      if (Array.isArray(json)) {
        return json.map((item) => this.validateFormData(this.schema, item, true)) as T
      }
      if (isObject(json)) {
        return this.validateFormData(this.schema, json, true) as T
      }
  
      throw new Error(`${json} should be an instance of Array or Plain Object, but type ${typeof json} was given.`)
    }
  
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