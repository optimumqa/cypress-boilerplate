---
to: package.json
inject: true
after: scripts
---
<% const environments = ["staging", "release", "production"] -%>
<% environments.forEach((env) => { -%>
    "<%= team ? team + '-' : '' -%><%= project -%>-<%= env -%>": "cypress run -e <%= team ? 'team=' + team + ',' : '' -%>product=<%= project -%>,env=<%= env -%>",
<% }) -%>
