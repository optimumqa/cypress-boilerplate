<h1 align="center">Welcome to cypress-boilerplate 👋</h1>
<div align="center"><b>Quickly generate</b> new projects, and start coding immediately with an <b>already pre-configured</b> project. While using this boilerplate you and your team can focus <b>more on coding</b>, and <b>less wory</b> about configuration. This boilerplate is full of useful plugins already configured, and much more! Good luck!
</div>

</br>

[![Release new version](https://github.com/optimumqa/cypress-boilerplate/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/optimumqa/cypress-boilerplate/actions/workflows/release.yml)
[![MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/optimumqa/cypress-boilerplate/blob/main/LICENSE)

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

> Template for one or multiple products.<br /> `cypress-boilerplate` saves you from all of the trouble when configuring.

## Table of contents

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Add a new product](#add-a-new-product)
  - [Example](#example)
- [Run](#run)
- [How we use it](#how-we-use-it)
  - [Add a new command to scripts](#add-a-new-command-to-scripts)
  - [Structure explained](#structure-explained)
    - [configs/product](#configsproduct)
    - [fixtures/foo/routes.json](#fixturesfooroutesjson)
    - [fixtures/foo/users.json](#fixturesfoousersjson)
    - [cypress/e2e/foo/](#cypresse2efoo)
    - [cypress/support/e2e/foo/](#cypresssupporte2efoo)
    - [cypress/support/e2e/commands.ts](#cypresssupporte2ecommandsts)
    - [cypress/support/helpers.ts](#cypresssupporthelpersts)
  - [Local config](#local-config)
- [Project flow](#project-flow)
  - [Adding new custom commands to package.json](#adding-new-custom-commands-to-packagejson)
- [Hygen part](#hygen-part)
- [Reporting](#reporting)
- [Build & Delpoy](#build--delpoy)
  - [Custom domain](#custom-domain)
- [What's inside?](#what-s-inside-)
  - [Prettier](#prettier)
  - [cypress-iframe](#cypress-iframe)
  - [cypress-localstorage-commands](#cypress-localstorage-commands)
- [Benefits of using this boilerplate project](#benefits-of-using-this-boilerplate-project)
  - [No configuring the project](#no-configuring-the-project)
  - [Suitable for beginners and easy to use](#suitable-for-beginners-and-easy-to-use)
- [Summary](#summary)
- [🤝 Contributing](#---contributing)
- [Show your support](#show-your-support)
- [📝 License](#---license)

## Getting started

### Installation

```sh
npx @optimumqa/cypress-boilerplate my-cypress-app
```

Install dependencies:

```sh
cd my-cypress-app
npm install
```

### Add a new product

`product` refers to your project.

```sh
$ npm run add-project
```

It will ask you for your:

- **product** name
- **baseUrl**

The example from image above would create the following structure and inject new scripts in package.json.

```
- configs/
  - foo/
    default.ts
- fixtures/
  - foo/
    - routes.json
    - users.json
- e2e/
  - foo/
    - default.cy.ts
- support/
  - foo/
    - commands.ts
    - index.ts
```

## Run

```sh
$ npm run foo-staging
```

> You can see that the generator has injected 3 default scripts into package.json

```json
{
  ...
  "scripts": {
    "foo-staging": "cypress run -e product=foo,env=staging",
    "foo-release": "cypress run -e product=foo,env=release",
    "foo-production": "cypress run -e product=foo,env=production",
  }
  ...
}
```

When run, it will specify only the test files in `cypress/e2e/foo`.

## How we use it

Follow all the steps above then:

### Add a new command to scripts

```json
// package.json
{
  ...
  "scripts": {
    ...
    "test": "npm run foo-staging"
    ...
  }
  ...
}
```

Then simply run:

```sh
$ npm test
```

`npm test` will automatically call the `npm pretest` command before it executes. It clears previous reports and related assets.

When tests is finished, your reports will be generated also. Keeps the command line clean and simple.

### Structure explained

#### configs/product

Here you can have different cypress configs per product. Which config is used is determined by the `type` argument while running cypress in the CLI. <br/>

For example if we add the following command to our `package.json`

```json
{
  ...
  "foo-staging-daily: cypress open --env product=foo,env=staging,type=daily"
  ...
}
```

and then run it

```sh
$ npm run foo-staging-daily
```

then `configs/foo/daily.ts` is used and merged with `./cypress.config.ts`.

This gives you an extra level of configuration for different test types where you need to target only specific spec files, all while keeping the package.json scripts part clean

#### fixtures/foo/routes.json

Here is the place to define your `baseUrl` and other URLs per each environment.

Preview

```json
{
  "staging": {
    "baseUrl": "https://exaple.com",
    "admin": "https://example.com/admin"
  },
  "release": {
    "baseUrl": "https://exaple.com"
  },
  "production": {
    "baseUrl": "https://exaple.com"
  }
}
```

Usage:

```js
import { routes } from '../../../support/helpers'

describe('Should visit admin', () => {
  it('Visit', () => {
    cy.visit(routes.admin)
  })
})
```

`routes` will always return routes from current set environment, which in this case, is `staging`.

### fixtures/foo/users.json

Here is the place to define your primary, seconday, etc. users list for your tests.

By default, you can see

Preview

```json
{
  "staging": {
    "primary": {
      "name": "User name",
      "email": "test@cypress_template_test.com",
      "password": "user password"
    }
  },
  "release": {
    "primary": {
      "name": "User name",
      "email": "test@cypress_template_test.com",
      "password": "user password"
    }
  },
  "production": {
    "primary": {
      "name": "User name",
      "email": "test@cypress_template_test.com",
      "password": "user password"
    }
  }
}
```

Usage:

```js
import { routes, users } from '../../../support/helpers'

describe('Should visit admin', () => {
  it('Visit and log in with primary user', () => {
    cy.visit(routes.admin)
    cy.logIn(users.primary)
  })
})
```

`users` will always return users from current set environment, which in this case, is `staging`.

> Users are randomized with each run.

Example every time you run Cypress, you will get a randomized email for the primary user.

```
johndoe@test.com will become johndoe+3283@test.com
```

You can disable this in `./cypress/support/helpers.ts`.

#### cypress/e2e/foo/

Here are your spec files as usual.

#### cypress/support/e2e/foo/

Your projects commands are here.

> If you have multiple projects, keep in mind that you will have access only to the commands from the `project` you've run in the CLI.
> This is done so that commands from multiple products do not override each other if they're the same name.

#### cypress/support/e2e/commands.ts

Here are your global/shared commands.

#### cypress/support/helpers.ts

You can import current **users** or **routes** from this file. It will give you the routes from the specified **product** and from the specified **environment**.

```js
import { users, routes } from '../../helpers'

describe('Example usage of helpers module', () => {
  it('Should log current main user and baseUrl', () => {
    cy.log(users.main) // object
    cy.log(users.main.email) // random email generated every time you run Cypress
    // This ensures your concurent jobs wont use the same user every run
  })
})
```

You can also import other stuff like this:

```js
import { product, env, type, baseUrl, getFixture, getUrl } from '../../helpers'

describe('Example usage of helpers module', () => {
  it('Should do something', () => {
    // These below helpers are pre-configured to look for directoris depending on your current setup/run
    // Below example shows what would be logged if you've run the project with "npm run foo-staging"
    // And you've set the baseUrl to "http://foo.example.com"

    cy.log(product) // foo
    cy.log(env) // staging
    cy.log(type) // default
    cy.log(baseUrl) // http://foo.example.com
    cy.log(getFixture('foo')) // JSON Object
    cy.log(getUrl('baseUrl')) // http://foo.example.com
  })
})
```

### Local config

Create a file `cypress.local.ts` inside `./cypress/configs/`. Your local config will be then merged with the global config and product config.

Here you can place your overrides.

> If you need to temporarily disable this file, just rename it.
> Example: cypress.local.ts -> cypress.local-tmp.ts

It is ignored by GIT.

## Project flow

### Adding new custom commands to package.json

Arguments

| name      | type     | default   | description                                                                                      |
| --------- | -------- | --------- | ------------------------------------------------------------------------------------------------ |
| `product` | `String` |           | Product name                                                                                     |
| `env`     | `String` | `staging` | Any environment you support                                                                      |
| `type`    | `String` | `default` | Used for targeting specific config inside `configs/product/`. Daily, weekly, smoke, you name it. |

Follow the command naming convention

- `product+environment+type`

Here are some example commands:

```json
{
  "scripts": {
    "foo-staging": "cypress run -e product=foo,env=staging",
    "foo-master-daily": "cypress run -e product=foo,env=master,type=daily",
    "foo-staging-weekly": "cypress run -e product=foo,env=staging,type=weekly"
  }
}
```

> There is no need to specify `specPattern`. If they're are not specified they'll be automatically set(depending on the `product` from CLI).

## Reporting

Location: `cypress/reports/mochawesome`

Reports will only be generated with the command:

```sh
npm run posttest
```

Make sure to clear previous reports before running your tests with the command:

```sh
npm run pretest
```

## What's inside?

Here is a list of plugins and libraries that come with this boilerplate:

### Prettier

Keeps the code clean and same style for everyone working on the project.
Make sure you have the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) installed in VSCode for it to work.

Modify the config in `./.prettierrc`

### cypress-iframe

See the [documentation](https://www.npmjs.com/package/cypress-iframe).

You can use the commands like described [here](https://www.npmjs.com/package/cypress-iframe#usage)

### cypress-localstorage-commands

[See documentation](https://www.npmjs.com/package/cypress-localstorage-commands).

Example usage:

```js
beforeEach(() => {
  cy.restoreLocalStorage()
  cy.visit('/')
})

afterEach(() => {
  cy.saveLocalStorage()
})
```

## Benefits of using this boilerplate project

### No configuring the project

With a clean, intuitive, and same project structure we keep everyone consistent across all projects.

### Suitable for beginners and easy to use

It may seem complicated, but as soon as you add your first project, everything will make sense and there is no turning back.

## Renovate

Delete `renovate.json` if you don't use it.

## Hygen part

Hygen is used to generate templates and inject code into your structure when running `npm run add-project`.

> You can modify the generator in `./_templates/project/with-prompt/`.
> <br/>

If you need to change default environments, they're declared in these files:

- `./_templates/project/with-prompt/fixtures.ejs.t`
- `./_templates/project/with-prompt/package.ejs.t`

## Summary

- Project is dynamically set up based on the three arguments above
- If you specify `baseURL` or `specPattern` in configs, they will not be overwritten.
- We can't imagine to work without this template, and hope you will feel the same :)

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/optimumqa/cypress-boilerplate/issues) if you want to contribute.<br />

## Show your support

Please ⭐️ this repository if this project helped you!

[![Stargazers](https://reporoster.com/stars/optimumqa/cypress-boilerplate)](https://github.com/optimumqa/cypress-boilerplate/stargazers)
</br>
[![Forkers](https://reporoster.com/forks/optimumqa/cypress-boilerplate)](https://github.com/optimumqa/cypress-boilerplate/network/members)

## 📝 License

This project is [MIT](https://github.com/optimumqa/cypress-boilerplate/blob/main/LICENSE) licensed.
