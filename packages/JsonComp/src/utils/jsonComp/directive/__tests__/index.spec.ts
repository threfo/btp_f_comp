import { doDirective, getDirective, getDirectives } from '../index'
import { setClientData } from '../utils/setClientData'

jest.mock('@/utils/jsonComp/directive/directiveInitFuncMap', () => ({
  __esModule: true,
  default: {
    setClientData: async () => {
      return await Promise.resolve(setClientData)
    }
  }
}))

jest.mock('@/utils/filter', () => ({ initFilter: () => {} }))

describe('utils/jsonComp/directive/index.ts', () => {
  test('getDirectives', () => {
    expect(JSON.stringify(getDirectives('test'))).toBe(
      JSON.stringify([
        {
          action: 'test'
        }
      ])
    )
    expect(
      JSON.stringify(
        getDirectives({
          action: 'test'
        })
      )
    ).toBe(
      JSON.stringify([
        {
          action: 'test'
        }
      ])
    )

    expect(
      JSON.stringify(
        getDirectives([
          {
            action: 'test'
          }
        ])
      )
    ).toBe(
      JSON.stringify([
        {
          action: 'test'
        }
      ])
    )

    expect(JSON.stringify(getDirectives(['test']))).toBe(
      JSON.stringify([
        {
          action: 'test'
        }
      ])
    )
  })

  test('getDirective', () => {
    expect(JSON.stringify(getDirective('test'))).toBe(
      JSON.stringify({
        action: 'test'
      })
    )
    expect(
      JSON.stringify(
        getDirective({
          action: 'test'
        })
      )
    ).toBe(
      JSON.stringify({
        action: 'test'
      })
    )
  })

  test('doDirective', async () => {
    const directiveContext: any = {}
    const that: any = { compData: {} }

    await doDirective({
      directive: {
        id: 'setClientDataDirectiveResult',
        action: 'setClientData',
        value: {
          a: 1,
          b: 2
        }
      },
      that,
      directiveContext
    })
    expect(JSON.stringify(that.compData)).toBe(
      JSON.stringify({
        a: 1,
        b: 2
      })
    )

    expect(JSON.stringify(directiveContext)).toBe(
      JSON.stringify({
        setClientDataDirectiveResult: {
          a: 1,
          b: 2
        }
      })
    )

    await doDirective({
      directive: {
        id: 'setClientDataDirectiveResult',
        action: 'setClientData',
        value: {
          a: 2,
          b: 3
        },
        callback: [
          {
            id: 'setClientDataDirectiveResult2',
            action: 'setClientData',
            value: {
              c: 4,
              d: 5
            },
            callback: [
              {
                id: 'setClientDataDirectiveResult',
                action: 'setClientData',
                value: {
                  a: 6,
                  b: 7,
                  c: 8
                }
              }
            ]
          },
          {
            id: 'setClientDataDirectiveResult',
            action: 'setClientData',
            value: {
              a: 9,
              b: 10,
              c: 11
            }
          }
        ]
      },
      that,
      directiveContext
    })

    expect(JSON.stringify(that.compData)).toBe(
      JSON.stringify({
        a: 9,
        b: 10,
        c: 11,
        d: 5
      })
    )
    expect(JSON.stringify(directiveContext)).toBe(
      JSON.stringify({
        setClientDataDirectiveResult: {
          a: 9,
          b: 10,
          c: 11,
          d: 5
        },
        setClientDataDirectiveResult2: {
          a: 2,
          b: 3,
          c: 4,
          d: 5
        }
      })
    )
  })
})
