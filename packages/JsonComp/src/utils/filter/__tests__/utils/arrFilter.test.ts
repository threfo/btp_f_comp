import { fn } from '../../utils/arrFilter'
describe('utils/filter/utils/arrFilter.ts', () => {
  it('fn notMatch', () => {
    expect(fn(['1', '2'], '2', 'notMatch')).toMatchSnapshot()

    expect(fn(['1', '2', '3'], ['2', '3', '4'], 'notMatch')).toMatchSnapshot()
  })

  it('fn match', () => {
    expect(fn(['1', '2'], '2', 'match')).toMatchSnapshot()

    expect(fn(['1', '2'], '', 'match')).toMatchSnapshot()

    expect(fn(['1', '2', '3'], ['2', '3', '4'], 'match')).toMatchSnapshot()
  })
})
