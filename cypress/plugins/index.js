const task = require('../../src/task')

// in this example, we only have our tasks, but if you had object with other tasks
// just merge the two
// const allTasks = Object.assign({}, aTask, task)

module.exports = (on, config) => {
  on('task', task)
}
