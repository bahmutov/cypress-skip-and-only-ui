# cypress-skip-and-only-ui [![renovate-app badge][renovate-badge]][renovate-app] [![CircleCI](https://circleci.com/gh/bahmutov/cypress-skip-and-only-ui.svg?style=svg)](https://circleci.com/gh/bahmutov/cypress-skip-and-only-ui) [![ci](https://github.com/bahmutov/cypress-skip-and-only-ui/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/bahmutov/cypress-skip-and-only-ui/actions/workflows/ci.yml) ![cypress version](https://img.shields.io/badge/cypress-9.7.0-brightgreen)

> Client-side buttons to run a single test or skip it for Cypress test runner

[![NPM][npm-icon] ][npm-url]

![Cypress skip and only](img/skip-and-only.gif)

## Install and use

```shell
npm i -D cypress-skip-and-only-ui
```

Require from your `cypress/support/index.js`

```js
require('cypress-skip-and-only-ui/support')
```

Require and register task from `cypress/plugins/index.js`

```js
const task = require('cypress-skip-and-only-ui/task')
module.exports = (on, config) => {
  on('task', task)
}
```

Note: if you have other tasks already, just merge the objects before registering

```js
const otherTask = { ... }
const task = require('cypress-skip-and-only-ui/task')
module.exports = (on, config) => {
  on('task', {
    otherTask,
    task
  })
}
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2019

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-skip-and-only-ui/issues) on Github

## MIT License

Copyright (c) 2019 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/cypress-skip-and-only-ui.svg?downloads=true
[npm-url]: https://npmjs.org/package/cypress-skip-and-only-ui
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
