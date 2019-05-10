const falafel = require('falafel')
const fs = require('fs')
const R = require('ramda')

const isTestBlock = name => node => {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === name
  )
}

const isDescribe = isTestBlock('describe')

const isContext = isTestBlock('context')

const isIt = isTestBlock('it')

const isItOnly = node => {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object &&
    node.callee.property &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'it' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.property.name === 'only'
  )
}

const isItSkip = node => {
  return (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object &&
    node.callee.property &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'it' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.property.name === 'skip'
  )
}

const getItsName = node => node.arguments[0].value

/**
 * Given a spec filename and name of a test, sets "it.only" for give list of tests.
 */
export const onlyTests = (specFilename, leaveTests) => {
  console.log('onlyTests in spec', specFilename)
  console.log('leave tests', leaveTests)

  const source = fs.readFileSync(specFilename, 'utf8')

  const shouldLeaveTest = testName => leaveTests.some(R.equals(testName))

  const findSuites = (node, names = []) => {
    if (!node) {
      return
    }

    if (isDescribe(node) || isContext(node)) {
      names.push(getItsName(node))
    }

    return findSuites(node.parent, names)
  }

  const skipAllTests = node => {
    // console.log(node)

    if (isIt(node)) {
      const names = [getItsName(node)]
      findSuites(node, names)

      // we were searching from inside out, thus need to revert the names
      const testName = names.reverse()
      console.log('found test', testName)
      if (shouldLeaveTest(testName)) {
        console.log('should .only test "%s"', testName)
        node.update('it.only' + node.source().substr(2))
        // console.log(node)
      }
    } else if (isItOnly(node)) {
      const testName = [getItsName(node)]
      console.log('found it.only', testName)
      // nothing to do
    } else if (isItSkip(node)) {
      const testName = [getItsName(node)]
      console.log('found it.skip', testName)
      node.update('it.only' + node.source().substr(7))
    }
  }
  let output;
  try {
    output = falafel(source, skipAllTests)
  } catch(err) {
    if (err.stack.includes("'import' and 'export' may appear only with 'sourceType: module'")) {
      output = falafel(source, { sourceType: "module" }, skipAllTests)
    }
  }
  // console.log(output)
  fs.writeFileSync(specFilename, output, 'utf8')
}

/**
 * Given a spec filename and name of a test, sets "it.skip" for give list of tests.
 */
export const skipTests = (specFilename, skipTests) => {
  console.log('skipTests in spec', specFilename)
  console.log('skip tests', skipTests)

  const source = fs.readFileSync(specFilename, 'utf8')

  const shouldLeaveTest = testName => skipTests.some(R.equals(testName))

  const findSuites = (node, names = []) => {
    if (!node) {
      return
    }

    if (isDescribe(node) || isContext(node)) {
      names.push(getItsName(node))
    }

    return findSuites(node.parent, names)
  }

  const skipAllTests = node => {
    // console.log(node)

    if (isIt(node)) {
      const names = [getItsName(node)]
      findSuites(node, names)

      // we were searching from inside out, thus need to revert the names
      const testName = names.reverse()
      console.log('found test', testName)
      if (shouldLeaveTest(testName)) {
        console.log('should .only test "%s"', testName)
        node.update('it.skip' + node.source().substr(2))
        // console.log(node)
      }
    } else if (isItOnly(node)) {
      const testName = [getItsName(node)]
      console.log('found it.only', testName)
      node.update('it.skip' + node.source().substr(7))
    } else if (isItSkip(node)) {
      const testName = [getItsName(node)]
      console.log('found it.skip', testName)
      // nothing to do
    }
  }
  let output;
  try {
    output = falafel(source, skipAllTests)
  } catch(err) {
    if (err.stack.includes("'import' and 'export' may appear only with 'sourceType: module'")) {
      output = falafel(source, { sourceType: "module" }, skipAllTests)
    }
  }
  // console.log(output)
  fs.writeFileSync(specFilename, output, 'utf8')
}

/**
 * Removes all .only and .skip from spec file
 */
export const runAllTests = specFilename => {
  console.log('enable all tests in spec', specFilename)

  const source = fs.readFileSync(specFilename, 'utf8')

  const findSuites = (node, names = []) => {
    if (!node) {
      return
    }

    if (isDescribe(node) || isContext(node)) {
      names.push(getItsName(node))
    }

    return findSuites(node.parent, names)
  }

  const enableAllTests = node => {
    // console.log(node)

    if (isItOnly(node)) {
      const testName = [getItsName(node)]
      console.log('found it.only', testName)
      node.update('it' + node.source().substr(7))
    } else if (isItSkip(node)) {
      const testName = [getItsName(node)]
      console.log('found it.skip', testName)
      node.update('it' + node.source().substr(7))
    }
  }
  let output;
  try {
    output = falafel(source, enableAllTests)
  } catch(err) {
    if (err.stack.includes("'import' and 'export' may appear only with 'sourceType: module'")) {
      output = falafel(source, { sourceType: "module" }, enableAllTests)
    }
  }
  // console.log(output)
  fs.writeFileSync(specFilename, output, 'utf8')
}

// module.exports = {
//   onlyTests,
//   skipTests,
//   runAllTests
// }

// if (!module.parent) {
//   onlyTests('./cypress/integration/spec.js', [['works b']])
// }
