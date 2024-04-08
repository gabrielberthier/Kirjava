export interface Converter<T> {
  parseEntity(json: string | object | object[]): T|Error
}

