/* eslint-disable no-template-curly-in-string */
import {
  getData,
  formatValue,
  formatCommand,
  getForLoopList,
  getChildren
} from '../index'

describe('utils/jsonComp/index.ts', () => {
  it('getChildren', () => {
    expect(
      getChildren({
        data: {},
        value: {
          is: 'test',
          children: [
            {
              is: 'test',
              for: '$a',
              html: '$__item'
            }
          ]
        }
      })
    ).toMatchSnapshot()

    expect(
      getChildren({
        data: {
          a: [1, 2]
        },
        value: {
          is: 'test',
          children: [
            {
              is: 'test',
              for: '$a',
              html: '$__item'
            }
          ]
        }
      })
    ).toMatchSnapshot()

    expect(
      getChildren({
        data: {
          a: [1, 2]
        },
        value: {
          is: 'test',

          children: [
            {
              is: 'test',
              isComponent: true,
              props: {
                a: '$a'
              }
            }
          ]
        }
      })
    ).toMatchSnapshot()

    expect(
      getChildren({
        data: {
          a: [1, 2]
        },
        value: {
          is: 'test',
          children: [
            {
              is: 'test',
              isComponent: true,
              for: '$a',
              html: '$__item'
            },
            {
              is: 'test',
              for: '$a',
              children: [
                {
                  is: 'test',
                  html: '$__item'
                }
              ]
            }
          ]
        }
      })
    ).toMatchSnapshot()
  })

  it('getForLoopList', () => {
    expect(
      getForLoopList({
        data: {},
        value: { is: 'div' }
      })
    ).toBeNull()

    const testData = {
      b: 'b1',
      list: [{ title: 'a' }, { title: '$b' }]
    }

    expect(
      getForLoopList({
        data: testData,
        value: {
          is: 'div',
          for: '$list' // 这样配置会获取 list 但是不解析 list内的变量应用
        }
      })
    ).toMatchSnapshot()

    expect(
      getForLoopList({
        data: testData,
        value: {
          is: 'div',
          for: {
            value: '$list', // 这样配置会获取 list 并深解析所有变量应用
            itemName: 'aa'
          }
        }
      })
    ).toMatchSnapshot()

    expect(
      getForLoopList({
        data: testData,
        value: {
          is: 'div',
          for: '$list',
          data: '$__item'
        }
      })
    ).toMatchSnapshot()
  })

  it('formatCommand', () => {
    expect(
      formatCommand({
        data: null,
        command: null
      })
    ).toBeNull()

    const data = {
      a: 'targetA',
      e: 'e1',
      value: {
        a1: 'a-1',
        a2: '$e',
        a3: '$f',
        a4: '${f}'
      },
      type: 'test-type'
    }

    expect(
      JSON.stringify(
        formatCommand({
          data,
          command: {
            target: '$a',
            type: '$type',
            value: '$value'
          }
        })
      )
    ).toBe(
      JSON.stringify({
        target: ['targetA'],
        type: 'test-type',
        value: '$value'
      })
    )
  })

  it('getData', () => {
    expect(
      JSON.stringify(
        getData({
          data: null,
          value: {
            is: 'test'
          }
        })
      )
    ).toBe(JSON.stringify({}))

    const checkData = getData({
      data: {
        a: '${a}',
        c: 4,
        h: '$$route'
      },
      value: {
        is: 'test',
        data: {
          a: 1,
          b: 3,
          f: '${e}',
          i: '$$route'
        }
      },
      parentData: {
        a: 0,
        e: 5
      },
      that: {
        $route: 1
      }
    })

    expect(JSON.stringify(checkData)).toBe(
      JSON.stringify({
        a: '1', // 因为 value.data.a 覆盖了 parentData.a 所以 data.a = value.data.a
        // e: 5, // 在原型链上
        b: 3,
        f: '5', //
        i: 1,
        c: 4,
        // g: 1 // that 上的值不加入对象 防止不可控问题
        h: 1
      })
    )
    expect(checkData.$route).toBeUndefined()
    expect(checkData.e).toBe(5)

    expect(
      JSON.stringify(
        getData({
          data: {},
          value: {
            is: 'test',
            data: '$a'
          },
          parentData: {
            a: {
              b: 1
            }
          }
        })
      )
    ).toBe(
      JSON.stringify({
        b: 1
      })
    )

    expect(
      JSON.stringify(
        getData({
          data: {},
          value: {
            is: 'test',
            data: {
              orgE1: '$e',
              orgE2: '${e}'
            }
          },
          parentData: checkData
        })
      )
    ).toBe(
      JSON.stringify({
        orgE1: 5,
        orgE2: '5'
      })
    )
  })

  it('formatValue', () => {
    expect(
      formatValue({
        data: {
          a: 2,
          c: 4,
          b: 5
        },
        value: {
          is: 'test',
          html: 'this is a: ${a}',
          data: {
            a: 1,
            b: 3
          },
          props: {
            e: 'this is c: ${c}',
            f: {
              g: 'this is b: ${b}'
            }
          }
        }
      })
    ).toMatchSnapshot()

    expect(
      formatValue({
        data: {
          a: {
            c: 4
          }
        },
        value: {
          is: 'test',
          props: '${a | json | toJson}'
        }
      })
    ).toMatchSnapshot()

    expect(
      formatValue({
        data: {
          a: {
            c: 4
          }
        },
        value: {
          is: 'test',
          props: '12'
        }
      })
    ).toMatchSnapshot()

    expect(
      formatValue({
        data: {
          a: [1, 2]
        },
        value: {
          is: 'test',
          for: '$a',
          html: '$__item'
        }
      })
    ).toMatchSnapshot()

    expect(
      formatValue({
        data: {
          a: [1, 2]
        },
        value: {
          is: 'test',
          children: [
            {
              is: 'test',
              for: '$a',
              html: '$__item'
            }
          ]
        }
      })
    ).toMatchSnapshot()

    expect(
      formatValue({
        data: {
          showLabel: 'test',
          showValue: 'testValue'
        },
        value: {
          is: 'el-dropdown',
          children: [
            {
              is: 'div',
              children: [
                {
                  is: 'div',
                  html: "${showLabel}${showValue ? '：' : ''}${showValue}"
                }
              ]
            }
          ],
          slotArr: [
            {
              value: {
                is: 'el-dropdown-menu',
                isComponent: true,
                children: [
                  {
                    is: 'el-dropdown-item',
                    isComponent: true,
                    html: 'ada'
                  }
                ]
              },
              slot: 'dropdown'
            }
          ]
        }
      })
    ).toMatchSnapshot()
  })
})
