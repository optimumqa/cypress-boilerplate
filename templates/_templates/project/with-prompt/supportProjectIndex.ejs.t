---
to: cypress/support/e2e/<%= project %>/index.ts
---

import commands from './commands'

export default {
  <%= project -%>: {
    ...commands, //
  },
}
