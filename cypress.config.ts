import { defineConfig } from 'cypress'
const task = require('./task');

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', task)
    }
  }
});