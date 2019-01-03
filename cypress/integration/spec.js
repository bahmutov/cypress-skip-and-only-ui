require('../../src')

it.only('works a', () => {})
it('works b', () => {
  throw new Error('nope')
})
it('works c', () => {})
