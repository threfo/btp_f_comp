import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import cloneDeep from 'lodash/cloneDeep'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import isObject from 'lodash/isObject'
import { h, Vue2, isVue2 } from 'vue-demi'

import { JsonCompValue, Template, Command, ForProps, Action } from './type'

import { getDirectives } from './directive'
import { resolveObj, resolveToObj, resolve, resolveToArr } from '../resole'
import { createObject } from '../index'

interface FormatValueProps {
  data: any
  value: JsonCompValue
}

interface GetDataProps extends FormatValueProps {
  parentData?: any
  that?: any
}

export const getData = (props: GetDataProps): any => {
  const { value, that, parentData } = props || {}
  let { data: jsonData } = value || {}
  let { data: compData } = props || {}

  let forJsonData: any = parentData
  const { $route } = forJsonData || {}
  if (!$route) {
    // forJsonData = mergeProto(that || {}, parentData || {}) // 让 resolve 的时候可以用this上的参数，如$route这些
    const { $route, $store } = that || {}
    forJsonData = createObject(parentData, { $route, $store })
  }
  if (isString(jsonData)) {
    jsonData = resolve(jsonData, forJsonData)
  }

  jsonData = resolveObj({
    data: forJsonData, // 让 resolve 的时候可以用this上的参数，如$route这些
    obj: jsonData || {},
    deep: true
  })
  // console.log('getData parentData.e:', (parentData || {}).e)
  // console.log('getData parentData:', parentData)
  // console.log('getData forJsonData:', forJsonData)
  // console.log('getData forJsonData.e:', (forJsonData || {}).e)
  // console.log('getData 2 jsonData:', jsonData)
  // console.log('getData 3 jsonData.e:', (jsonData || {}).e)
  // console.log('getData 1 compData:', compData)

  compData = resolveObj({
    data: createObject(forJsonData, jsonData),
    obj: compData || {},
    deep: true
  })

  // console.log('getData 2 compData:', compData)

  const returnData = createObject(parentData, {
    ...(jsonData || {}),
    ...(compData || {})
  })
  // console.log('getData returnData:', returnData)
  // console.log('getData returnData.e:', returnData.e)

  return returnData
}

const templateCacheMap: { [templateName: string]: Template | null } = {}

export const getTemplateData = async (
  templateName: string,
  that: any
): Promise<Template | null> => {
  let templateData: Template | null = templateCacheMap[templateName]
  // console.log('getTemplateData 1 templateName:', templateName, templateData)
  if (templateData === undefined && templateName) {
    const { $content } = that

    if ($content) {
      try {
        ;({ data: templateData } = (await $content(
          `data/build-in/${templateName}`
        ).fetch()) as any)
      } catch (error) {
        console.error(`templateName: ${templateName} not exist`)
      }
    } else {
      console.error(`getTemplateData $content not exist`)
    }

    if (!templateData) {
      // TODO 通过接口获取
    }
  }
  templateCacheMap[templateName] = templateData

  // console.log('getTemplateData 2 templateName:', templateName, templateData)
  return cloneDeep(templateData)
}

export const formatChildren = (children: JsonCompValue[], data: any) => {
  let newChildren: JsonCompValue[] = []

  ;(children || []).forEach(item => {
    const list = getForLoopList({ data, value: item })

    const { for: itemForValue } = item || {}

    if (Array.isArray(list)) {
      list.forEach(forItem => {
        newChildren.push(forItem)
      })
    } else if (!itemForValue) {
      newChildren.push(item)
    }

    newChildren = newChildren.map(newItem => {
      let returnItem = newItem
      const { isComponent, is } = newItem
      if (is !== 'JsonComp') {
        if (isComponent) {
          const { data: itemData, children: newItemChildren } = newItem

          returnItem = formatValue({
            value: newItem,
            data: getData({
              data: {},
              value: newItem,
              parentData: data
            })
          })

          const { length: childrenLength } = newItemChildren || []

          if (childrenLength) {
            returnItem.data = itemData
          }
        } else {
          returnItem = {
            is: 'JsonComp',
            props: {
              value: newItem,
              parentData: data
            }
          }
        }
      }

      delete returnItem.isComponent

      return returnItem
    })
  })

  return newChildren
}

export const getChildren = (props: FormatValueProps): JsonCompValue[] => {
  const { value: jsonCompValue, data } = props || {}
  const { children } = jsonCompValue || {}
  return formatChildren(children || [], data)
}

export const getSlotArr = (props: FormatValueProps) => {
  const { value: jsonCompValue, data } = props || {}
  const { slotArr } = jsonCompValue || {}

  let newSlotArr = slotArr

  if (newSlotArr) {
    newSlotArr = newSlotArr.map(item => {
      const { value: itemValue } = item || {}
      const [newItemValue] = formatChildren([itemValue], data)

      return {
        ...item,
        value: newItemValue
      }
    })
  }

  return newSlotArr
}

export const formatValue = (props: FormatValueProps): JsonCompValue => {
  const { value: jsonCompValue, data } = props || {}

  const forList = getForLoopList({ data, value: jsonCompValue })

  if (Array.isArray(forList)) {
    return {
      is: 'div',
      children: forList
    }
  }

  const {
    html,
    props: jsonCompProps,
    attrs,
    domProps,
    is,
    children,
    slotArr,
    id
  } = jsonCompValue || {}

  // console.log('formatValue data:', data)
  // console.log('formatValue value:', value)

  const returnData = cloneDeep(jsonCompValue)

  if (is) {
    returnData.is = `${resolve(is, data)}`
  }

  if (id) {
    returnData.id = `${resolve(id, data)}`
  }

  if (html) {
    let htmlValue = resolve(html, data)
    if (htmlValue === undefined) {
      htmlValue = ''
    }

    returnData.html = `${htmlValue}`
  }

  if (jsonCompProps) {
    returnData.props = resolveToObj(jsonCompProps, data)
  }
  if (attrs) {
    returnData.attrs = resolveToObj(attrs, data)
  }
  if (domProps) {
    returnData.domProps = resolveToObj(domProps, data)
  }

  if (children) {
    returnData.children = getChildren(props)
  }

  if (slotArr) {
    returnData.slotArr = getSlotArr(props)
  }

  delete returnData.data

  return returnData
}

export const formatCommand = ({
  command,
  data
}: {
  command: Command | any
  data: any
}): Command | null => {
  // TODO
  let { target, type } = command || {}

  if (target) {
    target = resolveToArr(target, data)
  }

  if (isString(type)) {
    type = resolve(type, data)
  }

  if (!type) {
    return null
  }

  return {
    ...command,
    target,
    type
  }
}

export const getNeedRunCommand = ({
  value,
  command
}: {
  value: JsonCompValue
  command: Command | any
}): Command | null => {
  const { id } = value || {}
  const { target } = command || {}

  let needRunCommand: Command | null = null

  // TODO 迭代优化成类 css 的 查找器： '#id .group' 按虚拟dom 层级查找
  if ((target || []).includes(id || '')) {
    needRunCommand = command
  }

  return needRunCommand
}

export const getForLoopList = (
  props: FormatValueProps
): JsonCompValue[] | null => {
  const { value: jsonComp, data } = props || {}
  let { for: forProps } = jsonComp

  // forProps 可能是 字符串 获取变量， 可能是变量，可能是配置
  forProps = resolveObj({
    obj: forProps,
    data,
    deep: true
  })

  // console.log('getForLoopList forProps:', forProps)

  if (!forProps) {
    return null
  }

  const { value = forProps, itemName } = (forProps || {}) as ForProps

  if (!Array.isArray(value)) {
    return null
  }

  return (value as any[]).map((item: any) => {
    const cloneObj = cloneDeep(jsonComp)

    delete cloneObj.for

    const { data: itemData } = cloneObj

    let newData = itemData

    if (isString(newData)) {
      newData =
        resolveToObj(
          newData,
          createObject(data, {
            [itemName || '__item']: item
          })
        ) || {}
    }

    if (!isObject(newData)) {
      newData = {}
    }

    newData = {
      ...newData,
      [itemName || '__item']: item
    }

    return {
      ...cloneObj,
      data: newData
    }
  })
}

export const getActionOn = (
  action: Action,
  that: any,
  needDefAction: boolean = false
) => {
  let defObj: any = {}
  if (needDefAction) {
    defObj = {
      command: that.command,
      input: (v: any) => {
        // console.log('input v:', v)
        that.modelData = v
      }
    }
  }

  return Object.keys(action || {}).reduce((obj, itemKey) => {
    const func = (action || {})[itemKey] as any
    if (isFunction(func)) {
      obj[itemKey] = (...props: any[]) => func({ that, props })
    } else {
      const directiveList = getDirectives(func)
      obj[itemKey] = (...props: any[]) =>
        that.runDirectives(directiveList, props)
    }
    return obj
  }, defObj)
}

export const jsonCompValue2RenderProps = ({
  jsonCompValue,
  that,
  otherProps
}: {
  jsonCompValue: JsonCompValue
  that: any
  otherProps?: any
}) => {
  const { props: jsonCompValueProps, attrs, domProps } = jsonCompValue || {}
  const { class: className, style, ...itemProps } = jsonCompValueProps || {}

  const newProps: any = { ...itemProps }
  if (that.modelData) {
    newProps.value = that.modelData
  }

  let renderProps: any = {
    props: newProps,
    attrs,
    domProps,
    class: className,
    style,
    on: getActionOn(jsonCompValue.action || {}, that, true)
  }

  if (jsonCompValue.nativeOn) {
    renderProps.nativeOn = getActionOn(jsonCompValue.nativeOn || {}, that)
  }

  if (otherProps) {
    renderProps = {
      ...renderProps,
      ...otherProps
    }
  }

  // console.log(
  //   'jsonCompValue2RenderProps is:',
  //   jsonCompValue.is,
  //   ' renderProps:',
  //   renderProps,
  //   'jsonCompValue:',
  //   jsonCompValue,
  //   'otherProps:',
  //   otherProps
  // )

  return renderProps
}

export const jsonCompValue2Render = ({
  jsonCompValue,
  createElement,
  that,
  otherProps
}: {
  jsonCompValue: JsonCompValue
  createElement?: any
  that: any
  otherProps?: any
}) => {
  const {
    is,
    props: jsonCompValueProps,
    children,
    html,
    slotArr
  } = jsonCompValue || {}

  const hFunc = createElement || h

  if (is === 'JsonComp') {
    return hFunc(is, {
      props: jsonCompValueProps
    })
  }

  const childrenNodes: any[] = []

  if (html) {
    childrenNodes.push(html)
  }

  ;(children || []).forEach((childrenItem, i) => {
    childrenNodes.push(
      jsonCompValue2Render({
        jsonCompValue: childrenItem,
        createElement: hFunc,
        that,
        otherProps: {
          key: `c_${i}`
        }
      })
    )
  })
  ;(slotArr || []).forEach((childrenItem, i) => {
    const { value, slot } = childrenItem || {}

    childrenNodes.push(
      jsonCompValue2Render({
        jsonCompValue: value,
        createElement: hFunc,
        that,
        otherProps: {
          slot,
          key: `s_${i}`
        }
      })
    )
  })

  // console.log('jsonCompValue2Render otherProps:', otherProps)

  return hFunc(
    is,
    jsonCompValue2RenderProps({
      jsonCompValue,
      that,
      otherProps
    }),
    childrenNodes
  )
}

export const isReservedCompVue2 = (compName: string, that: any) => {
  let isReserved = false
  const { isReservedTag } = Vue2.config as any
  if (isFunction(isReservedTag)) {
    isReserved = !!isReservedTag(compName)
  }

  if (!isReserved) {
    const { $options } = that || {}

    const { components } = $options || {}
    isReserved =
      !!components[compName] || !!components[upperFirst(camelCase(compName))]
  }
  // console.log('isReservedComp', compName, isReserved)
  return isReserved
}

export const isReservedComp = (compName: string, that: any) => {
  let isReserved = false
  console.log('isReservedComp compName', compName)
  console.log('isReservedComp that', that)

  if (isVue2) {
    isReserved = isReservedCompVue2(compName, that)
  } else {
    // console.log('isReservedComp  Vue.config', Vue.config)
  }
  console.log('isReservedComp', compName, isReserved)
  return isReserved
}
