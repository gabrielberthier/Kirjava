import { ZodError } from 'zod'
import type { AnyZodObject, SafeParseReturnType, ZodIssue, z } from 'zod'
import { objectToCamelCase } from './utils/camel-case'
import { isObject, isString } from '$services/utils/is'
import type { Converter } from './interfaces'

export class ConverterImplementation<T, S extends AnyZodObject> implements Converter<T> {
  constructor(private schema: S) {}

  parseEntity(json: string | object | object[]): T | Error {
    if (isString(json)) {
      json = JSON.parse(String(json))
    }

    if (Array.isArray(json)) {
      return this.extractArray(json)
    }
    if (isObject(json)) {
      const response = this.validateFormData(json, true)

      return response.success ? (response.data as T) : response.error
    }

    return new Error(
      `${json} should be an instance of Array or Plain Object, but type ${typeof json} was given.`
    )
  }

  private extractArray(json: object[]): T | Error {
    const dataBucket: any[] = []
    const issuesBucket: ZodIssue[][] = []
    const response = json.map((item) => this.validateFormData(item, true))
    for (const r of response) {
      if (r.success) {
        dataBucket.push(r.data)
      } else {
        issuesBucket.push(r.error.issues)
      }
    }

    if (issuesBucket.length) {
      const issues = issuesBucket.reduce((prev, cur) => prev.concat(cur))
      console.log(issues)
      return new ZodError(issues)
    }

    return dataBucket as T
  }

  private validateFormData(
    obj: any,
    forceCammelCase: boolean = false
  ): SafeParseReturnType<any, z.infer<S>> {
    if (forceCammelCase) {
      obj = objectToCamelCase(obj)
    }

    return this.schema.safeParse(obj)
  }
}
