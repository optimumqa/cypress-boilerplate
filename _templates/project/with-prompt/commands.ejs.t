---
to: cypress/support/index.ts
inject: true
append: true
---
import '<%= team -%><%= team ? "/" : null -%><%= project -%>/commands'
