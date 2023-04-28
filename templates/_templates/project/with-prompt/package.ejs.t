---
to: package.json
inject: true
after: scripts
---
<% const environments = ["staging", "release", "production"] -%>
<% environments.forEach((env) => { -%>
    "<%= project -%>-<%= env -%>": "cypress run -e product=<%= project -%>,env=<%= env -%>",
<% }) -%>
