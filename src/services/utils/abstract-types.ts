export type Constructor<T = {} | []> = new (...args: any[]) => T
export type GetElementType<T extends Array<Object>> = T extends (infer U)[] ? U : T
