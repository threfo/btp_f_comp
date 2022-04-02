import { DoDirectiveProps } from '../type'

import { resolveObj } from '../../../resole'
import { createObject } from '../../..'

export const setClientData = async (props: DoDirectiveProps) => {
  const { that, directive, props: p } = props
  const { value } = directive

  // console.log('setClientData', directive, props)

  if (that && value !== undefined) {
    const resoleData = createObject(that.__showData, { actionProps: p })

    // console.log('setClientData resoleData:', resoleData)

    const newValue = resolveObj({
      obj: value,
      data: resoleData,
      deep: true
    })

    // console.log('setClientData newValue:', newValue)

    Object.keys(newValue).forEach(key => {
      if (that.$set) {
        that.$set(that.compData, key, newValue[key])
      } else {
        that.compData[key] = newValue[key]
      }
    })
  }

  return await Promise.resolve(that.compData)
}

export default async () => {
  return await Promise.resolve(setClientData)
}
