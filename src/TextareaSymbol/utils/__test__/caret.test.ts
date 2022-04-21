import {
  initRange,
  getOldIEOffset,
  getDefOffset,
  getHeight0Offset,
  getOffset
} from '../caret'
describe('src/TextareaSymbol/utils/caret.ts', () => {
  it('initRange', () => {
    expect(initRange(null)).toBeNull()

    expect(initRange({})).toBeNull()

    expect(
      initRange({
        getSelection: () => ({})
      })
    ).toBeNull()

    expect(
      initRange({
        getSelection: () => ({
          rangeCount: 0
        })
      })
    ).toBeNull()

    expect(
      initRange({
        getSelection: () => ({
          rangeCount: 0,
          getRangeAt: (num: any) => num
        })
      })
    ).toBeNull()

    expect(
      initRange({
        getSelection: () => ({
          rangeCount: 1,
          getRangeAt: (num: any) => num
        })
      })
    ).toBe(0)

    expect(
      initRange({
        getSelection: () => ({
          rangeCount: 2,
          getRangeAt: (num: any) => num
        })
      })
    ).toBe(0)

    expect(
      initRange({
        getSelection: () => ({
          rangeCount: 2,
          getRangeAt: (num: any) => num + 1
        })
      })
    ).toBe(1)
  })

  it('getOldIEOffset', () => {
    expect(JSON.stringify(getOldIEOffset(null))).toBe(
      JSON.stringify({
        height: 0,
        left: 0,
        top: 0
      })
    )

    const a: any = {}

    expect(
      JSON.stringify(
        getOldIEOffset({
          createRange: () => {
            return {
              duplicate: () => {
                return {
                  moveStart: (arg1: any, arg2: any) => {
                    a.arg1 = arg1
                    a.arg2 = arg2
                  },
                  getBoundingClientRect: () => {
                    return {
                      bottom: 3,
                      top: 2,
                      left: 4
                    }
                  }
                }
              }
            }
          }
        })
      )
    ).toBe(
      JSON.stringify({
        height: 1,
        left: 4,
        top: 2
      })
    )

    expect(JSON.stringify(a)).toBe(
      JSON.stringify({
        arg1: 'character',
        arg2: -1
      })
    )
  })

  it('getDefOffset', () => {
    expect(JSON.stringify(getDefOffset(null))).toBe(
      JSON.stringify({
        height: 0,
        left: 0,
        top: 0
      })
    )

    const a: any = {}

    expect(
      JSON.stringify(
        getDefOffset({
          endContainer: 'endContainer',
          endOffset: 5,
          cloneRange: () => {
            return {
              setStart: (arg1: any, arg2: any) => {
                a.setStart = {
                  arg1,
                  arg2
                }
              },
              setEnd: (arg1: any, arg2: any) => {
                a.setEnd = {
                  arg1,
                  arg2
                }
              },
              getBoundingClientRect: () => {
                return {
                  height: 6,
                  top: 7,
                  left: 8,
                  width: 9
                }
              },
              detach: () => {
                a.detach = true
              }
            }
          }
        })
      )
    ).toBe(
      JSON.stringify({
        height: 6,
        left: 17,
        top: 7
      })
    )

    expect(JSON.stringify(a)).toBe(
      JSON.stringify({
        setStart: {
          arg1: 'endContainer',
          arg2: 4
        },
        setEnd: {
          arg1: 'endContainer',
          arg2: 5
        },
        detach: true
      })
    )
  })

  it('getHeight0Offset', () => {
    expect(JSON.stringify(getHeight0Offset(null, null))).toBe(
      JSON.stringify({
        height: 0,
        left: 0,
        top: 0
      })
    )

    const a: any = {}

    expect(
      JSON.stringify(
        getHeight0Offset(
          {
            cloneRange: () => {
              return {
                insertNode: (arg1: any) => {
                  a.insertNode = { arg1 }
                },
                selectNode: (arg1: any) => {
                  a.selectNode = { arg1 }
                },
                getBoundingClientRect: () => {
                  return {
                    height: 2,
                    left: 3,
                    top: 4
                  }
                },
                detach: () => {
                  a.detach = true
                }
              }
            }
          },
          {
            createTextNode: (shadowCaret: any) => {
              a.createTextNode = shadowCaret

              return {
                shadowCaret,
                remove: () => {
                  a.remove = true
                }
              }
            }
          }
        )
      )
    ).toBe(
      JSON.stringify({
        height: 2,
        left: 3,
        top: 4
      })
    )

    expect(JSON.stringify(a)).toBe(
      JSON.stringify({
        createTextNode: '|',
        insertNode: {
          arg1: { shadowCaret: '|' }
        },
        selectNode: {
          arg1: { shadowCaret: '|' }
        },
        remove: true,
        detach: true
      })
    )
  })

  it('getOffset', () => {
    expect(getOffset(null, null)).toBeUndefined()

    expect(
      JSON.stringify(
        getOffset(
          {},
          {
            document: {
              selection: 'document selection'
            },
            pageYOffset: 2,
            pageXOffset: 3
          },
          {
            _initRange: () => {
              return undefined
            },
            _getDefOffset: () => {
              return undefined
            },
            _getHeight0Offset: () => {
              return undefined
            },
            _getOldIEOffset: (arg1: any) => {
              return {
                arg1,
                type: '_getOldIEOffset',
                top: 1,
                left: 4
              }
            }
          }
        )
      )
    ).toBe(
      JSON.stringify({
        arg1: 'document selection',
        type: '_getOldIEOffset',
        top: 3,
        left: 7
      })
    )

    expect(
      getOffset(
        'el',
        {
          pageYOffset: 2,
          pageXOffset: 3,
          document: {}
        },
        {
          _initRange: (arg1: any) => {
            return {
              type: '_initRange',
              arg1,
              endOffset: 2,
              endContainer: 'endContainer'
            }
          },
          _getDefOffset: (arg1: any) => {
            return {
              type: '_getDefOffset',
              arg1,
              height: 0,
              top: 2,
              left: 3
            }
          },
          _getHeight0Offset: (arg1: any, arg2: any) => {
            return {
              type: '_getHeight0Offset',
              arg1,
              arg2,
              height: 1,
              top: 4,
              left: 5
            }
          },
          _getOldIEOffset: () => {
            return undefined
          }
        }
      )
    ).toMatchSnapshot()
  })
})
