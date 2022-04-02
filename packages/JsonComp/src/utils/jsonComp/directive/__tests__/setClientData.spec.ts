import initSetClientDataFunc, { setClientData } from '../utils/setClientData'

jest.mock('@/utils/filter', () => ({ initFilter: () => {} }))

describe('utils/jsonComp/directive/utils/setClientData.ts', () => {
  test('setClientData', async () => {
    const directiveContext = {}
    const that: any = { compData: {} }

    const test1 = await setClientData({
      directive: {
        action: 'setClientData',
        value: {
          a: 1,
          b: 2
        }
      },
      that,
      directiveContext
    })

    expect(that.compData.a).toBe(1)
    expect(that.compData.b).toBe(2)
    expect(that.compData.c).toBeUndefined()
    expect(test1.a).toBe(1)
    expect(test1.b).toBe(2)
    expect(test1.c).toBeUndefined()

    const func = await initSetClientDataFunc()

    const test2 = await func({
      directive: {
        action: 'setClientData',
        value: {
          a: 3,
          b: 4,
          c: 5
        }
      },
      that,
      directiveContext
    })

    expect(that.compData.a).toBe(3)
    expect(that.compData.b).toBe(4)
    expect(that.compData.c).toBe(5)
    expect(test2.a).toBe(3)
    expect(test2.b).toBe(4)
    expect(test2.c).toBe(5)
  })
})
