import { defineConfig } from 'cypress'
import task from './task';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', task)
    }
  }
});