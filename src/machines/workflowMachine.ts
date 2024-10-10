import { createMachine } from 'xstate';

export const workflowMachine = createMachine({
  id: 'workflow',
  initial: 'draft',
  states: {
    draft: {
      on: {
        SAVE: 'draft',
        PUBLISH: 'live'
      }
    },
    live: {
      on: {
        UNPUBLISH: 'draft'
      }
    }
  }
});