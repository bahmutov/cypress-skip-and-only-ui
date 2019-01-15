/// <reference types="cypress" />

import { append, concat, unnest } from 'ramda';

const _ = Cypress._

export const getRootSuite = runnable => {
  if (runnable.parent) {
    return getRootSuite(runnable.parent)
  }
  return runnable
}

export const getTests = (rootRunnable, title = []) => {
  const testNames = _.map(rootRunnable.tests, 'title')
  const fullTestNames = title.length
    ? testNames.map(name => append(name, title))
    : testNames.map(name => [name])

  // for each suite
  const fullSuiteNames = unnest(rootRunnable.suites.map(suite => {
    const fullSuiteName = append(suite.title, title)
    return getTests(suite, fullSuiteName)
  }))

  return concat(fullSuiteNames, fullTestNames)
}
