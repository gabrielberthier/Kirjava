import type { GhostError } from '@tryghost/content-api'
import type { EntitiesTypes } from './types'

export const isAllowedType = (type: string): type is EntitiesTypes =>
  ['posts', 'authors', 'tags', 'pages'].includes(type)

export const isGhostError = (object: any): object is GhostError => {
  if ('errors' in object && Array.isArray(object.errors)) {
    const errors: [] = object.errors
    return errors.every((el) => ['message', 'errorType'].every((member) => member in el))
  }

  return false
}
