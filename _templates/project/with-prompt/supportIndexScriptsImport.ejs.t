---
to: cypress/support/commands.ts
inject: true
after: ScriptsImport
---

import <%= team ? team + '_' : '' -%><%= project -%> from './<%= team ? team + '/' : '' -%><%= project -%>'
