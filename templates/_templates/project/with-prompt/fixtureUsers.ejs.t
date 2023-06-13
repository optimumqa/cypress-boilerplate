---
to: cypress/fixtures/<%- project %>/users.json
---

<% const environments = ["staging", "release", "production"] %>
{
  <% environments.forEach((env, index) => { %>
  "<%= env %>": {
    "primary": {
      "name": "User name",
      "email": "test@cypress_template_test.com",
      "password": "user password"
    },
    "secondary": {
      "name": "User name",
      "email": "test@cypress_template_test.com",
      "password": "user password"
    }
  }<%= environments.length - 1 === index ? '': ',' -%>
  <% }) %>
}

