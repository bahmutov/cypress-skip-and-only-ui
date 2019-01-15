const { onlyTests, skipTests, runAllTests } = require('./utils')

module.exports = {
  onlyTests: ({ filename, title }) => {
    onlyTests(filename, [title])
    return null
  },

  skipTests: ({ filename, title }) => {
    skipTests(filename, [title])
    return null
  },

  allTests: ({ filename, title }) => {
    runAllTests(filename, [title])
    return null
  }
}
