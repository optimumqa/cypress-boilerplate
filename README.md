<h1 align="center">Welcome to cypress-multi-product-template 👋</h1>
<a href="https://github.com/optimumqa/cypress-multi-product-template/blob/main/LICENSE">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
</a>
<a href="">
  <img alt="Cypress" src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e" target="_blank" />
</a>
<a href="">
  <img alt="Mocha" src="https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white" target="_blank" />
</a>
<a href="">
  <img alt="Typescript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" target="_blank" />
</a>
<a href="">
  <img alt="Javascript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" target="_blank" />
</a>

> Template for one or multiple products.<br /> `cypress-multi-product-templates` saves you from most of the trouble when configuring.

## ✨ Project structure

```
- cypress/

  - configs/
    - team/
      - project/
        - default.json
    - cypress.local.json
  - downloads/
  - fixtures/
    - team/
      - project/
        routes.json
  - integration/
    - team/
      - project/
        - default.spec.ts
  - plugins/
  - screenshots/
  - support/
    - team/
      - project/
        - commands.ts
    - commands.ts
  - videos/
```

## Local config

Create a file `cypress.local.json` inside ./configs/. Your local config will be then merged with cypress.json

## 🚀 Developing

### Adding a new product

#### CLI

![Example](https://github.com/optimumqa/cypress-multi-product-template/blob/main/md-images/cypress-multi-product-template-adding-project.png)

Example
`$ npm run add-project`

You can omit the team

This will create the following structure and inject new scripts to run in package.json. It will also import commands from newly created directory.

```
- configs/
  - team/
    - product/
      default.json
- fixtures/
  - team/
    - product/
      - routes.js
- integration/
  - team/
    - product/
      - default.spec.ts
- support/
  - team/
    - product/
      - commands.ts
```

You can modify this in `./_templates/project/with-prompt/`
Environments are listed in:

- `./_templates/project/with-prompt/fixtures.ejs.t`
- `./_templates/project/with-prompt/package.ejs.t`

# Project flow

## Adding new scripts to package.json

CLI Arguments

| name      | type     | default   | description                                                                                          |
| --------- | -------- | --------- | ---------------------------------------------------------------------------------------------------- |
| `product` | `String` |           | Product name                                                                                         |
| `team`    | `String` |           | Team name                                                                                            |
| `env`     | `String` | `staging` | Any environment you support                                                                          |
| `type`    | `String` | `default` | Used for targeting specific config inside `configs/productName/`. Daily, weekly, smoke, you name it. |

Command Naming convention

- `team+product+environment+type`

Here are some example commands:

```json
{
  "scripts": {
    "teamOne-myProduct-staging": "cypress run --env team=teamOne,product=myProduct,env=staging",
    "myProduct-master-daily": "cypress run --env product=myProduct,env=master,type=daily",
    "myProduct2-staging-weekly": "cypress run --env product=myProduct2,env=staging,type=weekly"
  }
}
```

There is no need to specify test files.

Behind the scenes:

- `plugins/index.js` - Starting point
- `plugins/Config.js` - CLI Arguments are being processed
- Global config `./cypress.json` is merged with `cypress/config/${product}/${type}.json`
- If `product` is not specified project cant be run
- If neither of the two above configs has `testFiles` specified, the're automatically created and pointing to `integration/${product}/**/*`
- If `baseUrl` is not specified in either of the two above configs, it's created automatically
- `baseUrl` is retrieved from `fixtures/routes.json`

Summary

- Project is dynamically set up based on the four CLI Arguments above
- If you specify baseURL or testFiles in configs, they will not be overwritten

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/optimumqa/cypress-multi-product-template/issues) if you want to contribute.<br />

## Show your support

Please ⭐️ this repository if this project helped you!

## 📝 License

This project is [MIT](https://github.com/optimumqa/cypress-multi-product-template/blob/main/LICENSE) licensed.
