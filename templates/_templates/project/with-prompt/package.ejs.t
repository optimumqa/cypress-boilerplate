---
to: package.json
inject: true
after: scripts
---
<% const environments = ["staging", "release", "production"] -%>
<% environments.forEach((env) => { -%>
    "<%= project -%>-<%= env -%>": "cypress run -e product=<%= project -%>,env=<%= env -%>",
    "<%= project -%>-<%= env -%>.open": "cypress open --e2e -e product=<%= project -%>,env=<%= env -%>",
<% }) -%>
