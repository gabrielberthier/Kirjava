import { isObject } from "$services/utils/functions"

export class ApiErrorResponse extends Error {
    constructor(message: string | object) {
      if (isObject(message)) {
        message = JSON.stringify(message)
      }
      super(message as string)
    }
  }