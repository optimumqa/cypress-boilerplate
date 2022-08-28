---
to: cypress/support/commands.ts
inject: true
after: ObjectInsertion
---

<%= team ? team + '_' : '' -%><%= project -%>,
