<h1 align="center">Welcome to cypress-boilerplate 👋</h1>
<div align="center"><b>Quickly generate</b> new projects, and start coding immediately with an <b>already pre-configured</b> project. While using this boilerplate you and your team can focus <b>more on coding</b>, and <b>less wory</b> about configuration. This boilerplate is full of useful plugins already configured, and much more! Good luck!
</div>

</br>

<a href="https://github.com/optimumqa/cypress-boilerplate/blob/main/LICENSE">
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
    - [configs/team/product](#configsteamproduct)
    - [fixtures/foo/bar/routes.json](#fixturesfoobarroutesjson)
    - [fixtures/foo/bar/users.json](#fixturesfoobarusersjson)
    - [cypress/e2e/foo/bar/](#cypresse2efoobar)
    - [cypress/support/e2e/foo/bar/](#cypresssupporte2efoobar)
    - [cypress/support/e2e/commands.ts](#cypresssupporte2ecommandsts)
    - [cypress/support/helpers.ts](#cypresssupporthelpersts)
  - [Local config](#local-config)
- [Project flow](#project-flow)
  - [Adding new custom commands to package.json](#adding-new-custom-commands-to-packagejson)
- [Hygen part](#hygen-part)
- [Reporting](#reporting)
- [Build & Delpoy](#build--delpoy)
  - [Github Actions & Pages](#github-actions--pages)
    - [Custom domain](#custom-domain)
- [What's inside?](#what-s-inside-)
  - [cypress-if](#cypress-if)
  - [Prettier](#prettier)
  - [FakerJS](#fakerjs)
  - [cypress-iframe](#cypress-iframe)
  - [cypress-lighthouse](#cypress-lighthouse)
  - [cypress-localstorage-commands](#cypress-localstorage-commands)
  - [cypress-testing-library](#cypress-testing-library)
  - [momentjs](#momentjs)
- [Benefits of using this boilerplate project](#benefits-of-using-this-boilerplate-project)
  - [No configuring the project](#no-configuring-the-project)
  - [Suitable for beginners and easy to use](#suitable-for-beginners-and-easy-to-use)
  - [You can have 2 levels of separation](#you-can-have-2-levels-of-separation)
- [Summary](#summary)
- [🤝 Contributing](#---contributing)
- [Show your support](#show-your-support)
- [📝 License](#---license)

## Getting started

### Installation

Download a .zip of this project or:

```sh
$ git clone git@github.com:optimumqa/cypress-boilerplate.git
```

or

```sh
gh repo clone optimumqa/cypress-boilerplate
```

If you have cloned this repository, make sure to delete the `.git` directory:

```sh
$ cd cypress-boilerplate && rm -rf .git
```

Also, don't forget to rename the project to your needs.

### Add a new product

`product` refers to your project.

### Example

![npm-run-add-project](https://github.com/optimumqa/cypress-boilerplate/blob/main/md-images/howtouse.gif)

```sh
$ npm run add-project
```

It will ask you for your:

- **team** name
- **product** name
- **baseUrl**

> You can omit the team if you don't need this level of separation.

The example from image above would create the following structure and inject new scripts in package.json.

```
- configs/
  - foo/
    - bar/
      default.ts
- fixtures/
  - foo/
    - bar/
      - routes.json
      - users.json
- e2e/
  - foo/
    - bar/
      - default.cy.ts
- support/
  - foo/
    - bar/
      - commands.ts
      - index.ts
```

## Run

```sh
$ npm run foo-bar-staging
```

or if you have omitted the team, the command would be

```sh
$ npm run bar-staging
```

> You can see that the generator has injected 3 default scripts into package.json

```json
{
  ...
  "scripts": {
    "foo-bar-staging": "cypress run -e team=foo,product=bar,env=staging",
    "foo-bar-release": "cypress run -e team=foo,product=bar,env=release",
    "foo-bar-production": "cypress run -e team=foo,product=bar,env=production",
  }
  ...
}
```

When run, it will specify only the test files in `cypress/e2e/foo/bar`.

## How we use it

Follow all the steps above then:

### Add a new command to scripts

```json
// package.json
{
  ...
  "scripts": {
    ...
    "test": "npm run foo-bar-staging"
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

#### configs/team/product

Here you can have different cypress configs per product. Which config is used is determined by the `type` argument while running cypress in the CLI. <br/>

For example if we add the following command to our `package.json`

```json
{
  ...
  "foo-bar-staging-daily: cypress open --env team=foo,product=bar,env=staging,type=daily"
  ...
}
```

and then run it

```sh
$ npm run foo-bar-staging-daily
```

then `configs/foo/bar/daily.ts` is used and merged with `./cypress.config.ts`.

This gives you an extra level of configuration for different test types where you need to target only specific spec files, all while keeping the package.json scripts part clean

#### fixtures/foo/bar/routes.json

Here is the place to define your `baseUrl` and other URLs per each environment. See bellow where you can configure default environments when Hygen is run.

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

### fixtures/foo/bar/users.json

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

#### cypress/e2e/foo/bar/

Here are your spec files as usual.

#### cypress/support/e2e/foo/bar/

Your projects commands are here.

> If you have multiple projects, keep in mind that you will have access only to the commands from the `team + project` you've run in the CLI.
> This is done so that commands from multiple products do not override each other if they're the same name.

#### cypress/support/e2e/commands.ts

Here are your global commands.

#### cypress/support/helpers.ts

You can import current **users** or **routes** from this file. It will give you the routes from the specified **team, and/or product** and from the specified **environment**.

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
import { product, team, env, type, baseUrl, getFixture, getUrl } from '../../helpers'

describe('Example usage of helpers module', () => {
  it('Should do something', () => {
    // These below helpers are pre-configured to look for directoris depending on your current setup/run
    // Below example shows what would be logged if you've run the project with "npm run foo-bar-staging"
    // And you've set the baseUrl to "http://foo-bar.example.com"

    cy.log(product) // bar
    cy.log(team) //  foo
    cy.log(env) // staging
    cy.log(type) // default
    cy.log(baseUrl) // http://foo-bar.example.com
    cy.log(getFixture('foo')) // JSON Object
    cy.log(getUrl('baseUrl')) // http://foo-bar.example.com
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

| name      | type     | default   | description                                                                                           |
| --------- | -------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `product` | `String` |           | Product name                                                                                          |
| `team`    | `String` |           | Team name                                                                                             |
| `env`     | `String` | `staging` | Any environment you support                                                                           |
| `type`    | `String` | `default` | Used for targeting specific config inside `configs/team/product/`. Daily, weekly, smoke, you name it. |

Follow the command naming convention

- `team+product+environment+type`

Here are some example commands:

```json
{
  "scripts": {
    "foo-bar-staging": "cypress run -e team=foo,product=bar,env=staging",
    "bar-master-daily": "cypress run -e product=bar,env=master,type=daily",
    "bar-staging-weekly": "cypress run -e product=bar,env=staging,type=weekly"
  }
}
```

> There is no need to specify `specPattern`. If they're are not specified they'll be automatically set(depending on `team` and `product` from CLI).

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

## Build & Delpoy

Reports are deployed to [your-reporting.domain.com](https://report-example.optimumqa.com)

Make sure to set rules for triggering build and deploy:

- Pull request to `main` branch
- Push to `main` branch

### Github Actions & Pages

`.github/workflows/build-report.yml` is enabled.

It uses the "npm run test" command to run tests, so make sure you enable it or configure it to your needs.

Example:

```json
{
  "test": "npm run your-product-staging"
}
```

After running `posttest`, it will deploy the reports in `cypress/reports/mochawesome` to your github page that you've configured.

#### Custom domain

If you have a custom domain, configure it in the `./CNAME`.

Create a file named `CNAME` or Github will automatically create it when you enter your domain to Github pages in the settings of your repository.

Example

```
// ./CNAME
your-reporting.domain.com
```

After tests are run, this file will be copied to report location automatically.

To see how to configure Github pages in the repository settings, see [Github pages docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

## What's inside?

Here is a list of plugins and libraries that come with this boilerplate:

### cypress-if

[Github repository](https://github.com/bahmutov/cypress-if)

Example usage:

Checks the existence of the element and closes the dialog if exists.

```js
cy.get('dialog#survey').if('visible').contains('button', 'Close').click()
```

Amazing plugin! Make sure to [read the documentation](https://github.com/bahmutov/cypress-if#readme) to see what more it is capable of.

### Prettier

Keeps the code clean and same style for everyone working on the project.
Make sure you have the [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) installed in VSCode for it to work.

Modify the config in `./.prettierrc`

### FakerJS

You might have projects where you need to use only one user the entire time. But there are times too when you need to set up new data every single time.
[This library](https://fakerjs.dev/) gives you as much data as you want.

```js
import { faker } from '@faker-js/faker'

const randomName = faker.name.fullName() // Rowan Nikolaus
const randomEmail = faker.internet.email() // Kassandra.Haley@erich.biz
```

### cypress-iframe

See the [documentation](https://www.npmjs.com/package/cypress-iframe).

You can use the commands like described [here](https://www.npmjs.com/package/cypress-iframe#usage)

### cypress-lighthouse

See [how to implement and use it](https://glebbahmutov.com/blog/cypress-lighthouse/)

Example usage:

```js
it('loads fast enough', () => {
  cy.visit('/')
  cy.lighthouse()
})
```

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

### cypress-testing-library

[See documentation](https://testing-library.com/docs/cypress-testing-library/intro/).

Example usage:

```js
cy.findByRole('button', { name: /Jackie Chan/i }).click()
cy.findByRole('button', { name: /Button Text/i }).should('exist')
cy.findByRole('button', { name: /Non-existing Button Text/i }).should('not.exist')
cy.findByLabelText(/Label text/i, { timeout: 7000 }).should('exist')

// findByRole _inside_ a form element
cy.get('form')
  .findByRole('button', { name: /Button Text/i })
  .should('exist')
cy.findByRole('dialog').within(() => {
  cy.findByRole('button', { name: /confirm/i })
})
```

### momentjs

[See documentation](https://momentjs.com/).

Example usage:

```js
moment().format('MMMM Do YYYY, h:mm:ss a') // September 15th 2022, 4:15:18 am
moment().format('dddd') // Thursday
moment().format('MMM Do YY') // Sep 15th 22
moment().format('YYYY [escaped] YYYY') // 2022 escaped 2022
moment().format()
```

## Benefits of using this boilerplate project

### No configuring the project

With a clean, intuitive, and same project structure we keep everyone consistent across all projects.

### Suitable for beginners and easy to use

It may seem complicated, but as soon as you add your first project, everything will make sense and there is no turning back.

### You can have 2 levels of separation

Imagine you have a big project which has multiple teams working on. It may seem reasonable to create multiple new Cypress project for each part of that big project.

With this template you dont have to. You can create as much teams, and products you want with great level of separation.
Once any team runs their projects, only their commands and their code will be loaded into the Cypress test runner.

You dont have to worry if your command names will override other teams or products, in fact you can even share global commands in `./cypress/support/e2e/commands.ts`

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

- Project is dynamically set up based on the four arguments above
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
