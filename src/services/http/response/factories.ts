import { ResponseHandlerImplementation } from './implementation'
import type { Converter } from '$domain/adapters'

export const makeDefaultResponseHandler = <T>(converter: Converter<T>) => {
  return new ResponseHandlerImplementation<T>(converter)
}
