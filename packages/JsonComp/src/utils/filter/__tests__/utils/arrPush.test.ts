import { fn } from '../../utils/arrPush'
describe('utils/filter/utils/arrPush.ts', () => {
  it('fn', () => {
    expect(fn('2', ['1', '2'])).toMatchSnapshot()

    expect(fn(['1', '2', '3'], ['2', '3', '4'])).toMatchSnapshot()
  })
})
