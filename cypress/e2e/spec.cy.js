/// <reference types="cypress" />

it('works a', () => {})
it.skip('works b', () => {
  throw new Error('nope')
})
it('works c', () => {})

describe('several tests together', () => {
  it('has a test', () => {})

  it('has second test', () => {})

  context('inner', () => {
    it('has deep test', () => {})
  })
})