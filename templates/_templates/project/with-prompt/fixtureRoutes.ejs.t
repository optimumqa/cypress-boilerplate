---
to: cypress/fixtures/<%- project %>/routes.json
---

<% const environments = ["staging", "release", "production"] %>
{
  "commonPaths": {},
  "envs": {
    <% environments.forEach((env, index) => { %>
      "<%= env %>": {
        "baseUrl": "<%= baseUrl %>"
      }<%= environments.length - 1 === index ? '': ',' -%>
    <% }) %>
  }
}

