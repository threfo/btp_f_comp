export const createObject = <T>(prototype: any, properties: T): T => {
  const createdObject: any = Object.create(prototype || {})
  return Object.assign(createdObject, properties || {})
}

export const isPromise = (obj: any) =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'
