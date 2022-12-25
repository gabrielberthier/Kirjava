import { Converter, type Convert, type Constructor, MultiItemConverter, type GetElementType } from '$domain/adapters'
import { ResponseHandlerImplementation } from './implementation'

class Factory {
    create<T>(type: (new () => T)): T {
        return new type();
    }
}

export const makeDefaultResponseHandler = <T extends object>(type: Constructor<T>,) => {
  return new ResponseHandlerImplementation<T>(new Converter<T>(type))
}

export const makeDefaultResponseHandlerMany = <T extends object>(type: Constructor<T>,) => {
  return new ResponseHandlerImplementation<T[]>(new MultiItemConverter<T[]>(type))
}
