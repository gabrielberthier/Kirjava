import type { Constructor } from '$domain/adapters'
import { Converter, MultiItemConverter } from '$domain/adapters'

import { ResponseHandlerImplementation } from './implementation'

export const makeDefaultResponseHandler = <T extends object>(type: Constructor<T>) => {
  return new ResponseHandlerImplementation<T>(new Converter<T>(type))
}

export const makeDefaultResponseHandlerMany = <T extends object>(type: Constructor<T>) => {
  return new ResponseHandlerImplementation<T[]>(new MultiItemConverter<T[]>(type))
}
