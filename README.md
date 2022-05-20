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

> Template for one or multiple products.<br /> `cypress-multi-product-templates` saves you from most of the trouble when configuring tests.

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
        - default.spec.js
  - plugins/
  - screenshots/
  - support/
    - commands.ts
  - videos/
```

## Local config

### Manual

Create a file `cypress.local.json` inside ./configs/. Your local config will be then merged with cypress.json

### CLI

`grunt exec:generateLocalConfig`

## 🚀 Developing

### Adding a new product

#### CLI

Example
`grunt exec:add:myProduct`

This will create following structure

```
- configs/
  - myProduct/
    default.json
- integration/
  - myProduct/
    - web/
      - default.spec.js
    - mobile/
      - default.spec.js
```

You can also add a team. It's optional

Example
`grunt exec:add:myProduct:teamOne`

This will create following structure

```
- configs/
  - teamOne/
    - myProduct
     default.json
- integration/
  - teamOne/
     - myProduct
      - default.spec.js
```

You can modify this in `./GruntFile.js`

#### Manual way

Let's assume we need to add a new product myProduct. The product has only web channel supported.

1. `integration/`

   - Create a directory `web/` inside `myProduct/`
   - Write your tests inside it
   - End result `integration/myProduct/web/`

2. `configs/`.

   - Create a new directory `myProduct/`
   - Create a new file named `default.json` and make it empty `{}`
   - End result `configs/myProduct/default.json`

3. `fixtures/routes.json`

   - Add routes for all channels supported by the product

4. `package.json`
   - Add your commands in scripts
   - Commands follow next naming convention: `product-channel-type`
   - Example `myProduct-release: cypress run --env product=myProduct,env=release`

# Project flow

## Adding new scripts in package.json

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
