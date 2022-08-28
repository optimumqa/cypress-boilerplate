---
to: cypress/fixtures/<%- team %>/<%- project %>/routes.json
---

<% const environments = ["staging", "release", "production"] %>
{
  <% environments.forEach((env, index) => { %>
  "<%= env %>": {
    "baseUrl": "<%= baseUrl %>"
  }<%= environments.length - 1 === index ? '': ',' -%>
  <% }) %>
}

