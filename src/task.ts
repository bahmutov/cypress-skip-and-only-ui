import { onlyTests, runAllTests, skipTests } from './task-utils';

module.exports = {
  onlyTests: ({ filename, title }) => {
    onlyTests(filename, [title])
    return null
  },

  skipTests: ({ filename, title }) => {
    skipTests(filename, [title])
    return null
  },

  allTests: ({ filename }) => {
    runAllTests(filename)
    return null
  }
}
