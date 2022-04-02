import filterFuncMap from './filterFuncMap'

export const initFilter = (registerFilter: any): void => {
  Object.keys(filterFuncMap).forEach(key => {
    registerFilter(key, filterFuncMap[key])
  })
}
