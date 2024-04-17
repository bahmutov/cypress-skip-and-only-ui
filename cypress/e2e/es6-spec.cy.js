/// <reference types="cypress" />
import { foo } from '../foo'
it('works with imports', () => {
  expect(foo).to.equal('foo')
})

it('works with imports 2', () => {
  expect(foo).to.be.a('string')
})