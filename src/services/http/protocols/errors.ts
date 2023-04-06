export class ApiErrorResponse extends Error {
  constructor(message: string) {
    super(message)
  }
}
