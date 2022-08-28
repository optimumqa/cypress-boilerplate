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

> Template for one or multiple products.<br /> `cypress-multi-product-templates` saves you from all of the trouble when configuring.

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

## Adding a new product

### CLI

![npm-run-add-project](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cns7m5lfeko5im3w16qn.png)

Example
`$ npm run add-project`

It will ask you for your team and project name. **Project name is mandatory**. <br/>

> You can omit the team if you don't need this level of separation.

This will create the following structure and inject new scripts in package.json.

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

### Structure explained

- **configs/team/product**

Here you can have different cypress configs product specific. Which config is used is determined by the `type` argument while running cypress. <br/>

For example if `type=daily` then `configs/team/products/daily.json` is used and merged with ./cypress.json.

- **fixtures/team/product/routes.json**

Here is the place to store your `baseUrl` per environment. See bellow where you can configure these environments.

- **cypress/integration/team/product/**

Here come your spec files.

- **cypress/support/team/product/**

Add your projects commands here. These are afterwards loaded after global commands.

> You can modify this generator in `./_templates/project/with-prompt/`.
> <br/>

Change defaults environments here:

- `./_templates/project/with-prompt/fixtures.ejs.t`
- `./_templates/project/with-prompt/package.ejs.t`

### Local config

Create a file `cypress.local.json` inside ./configs/. Your local config will be then merged with the products config and global cypress.json.

It is ignored by GIT.

## Project flow

### Adding new scripts to package.json

Arguments

| name      | type     | default   | description                                                                                           |
| --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `product` | `String` |           | Product name                                                                                          |
| `team`    | `String` |           | Team name                                                                                             |
| `env`     | `String` | `staging` | Any environment you support                                                                           |
| `type`    | `String` | `default` | Used for targeting specific config inside `configs/team/product/`. Daily, weekly, smoke, you name it. |

Command Naming convention

- `team+product+environment+type`

Here are some example commands:

```json
{
  "scripts": {
    "team-product-staging": "cypress run --env team=team,product=product,env=staging",
    "product-master-daily": "cypress run --env product=product,env=master,type=daily",
    "product2-staging-weekly": "cypress run --env product=product2,env=staging,type=weekly"
  }
}
```

There is no need to specify test files. If test files are not specified they'll be automatically set, depending on `team` and `product`, from `cypress/integration/`.

Behind the scenes:

- `plugins/index.js`
  Starting point

- `plugins/Config.js`
  CLI Arguments are being processed

- Global config `./cypress.json` is merged with `cypress/config/${product}/${type}.json`

- Local config(if exists) `./cypress/configs/cypress.local.json` is merged with the two above

- If `product` is not specified project cant be run
  Yes, this means that this project can't be run with just `cypress open` or `cypress run`.

- If neither of the three above configs has `testFiles` specified, the're automatically created and pointing to `integration/${product}/**/*`

- If `baseUrl` is not specified in either of the three above configs, it's created automatically

- `baseUrl` is retrieved from `fixtures/team/product/routes.json` depending on environment

## Plugins

Plugins are located in `./cypress/plugins/`.

All plugins are enabled by default and are processed inside `./cypress/plugins/index.js`

### Store plugin

Enables you to create stores while running your spec files.

Example of setting a new item into CommonStore. If the store does not exist, it will be created:

```js
cy.task('setItem', {
  storeId: 'CommonStore',
  item: {
    name: 'token',
    value: 'blabla',
  },
})
```

Example getting an item from a store:

```js
cy.task('getItem', {
  storeId: 'CommonStore',
  item: {
    name: 'token',
  },
}).then((item) => {
  console.log(item)
})
```

Summary

- Project is dynamically set up based on the four arguments above
- If you specify `baseURL` or `testFiles` in configs, they will not be overwritten.

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/optimumqa/cypress-multi-product-template/issues) if you want to contribute.<br />

## Show your support

Please ⭐️ this repository if this project helped you!

## 📝 License

This project is [MIT](https://github.com/optimumqa/cypress-multi-product-template/blob/main/LICENSE) licensed.
