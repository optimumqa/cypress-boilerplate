<h1 align="center">Welcome to cypress-boilerplate 👋</h1>
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

## Add a new product

`product` refers to your project.

### Example

![npm-run-add-project](https://github.com/optimumqa/cypress-boilerplate/blob/main/md-images/foo-bar-example.png)

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
      default.json
- fixtures/
  - foo/
    - bar/
      - routes.js
- integration/
  - foo/
    - bar/
      - default.spec.ts
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
    "foo-bar-staging": "cypress run --env team=foo,product=bar,env=staging",
    "foo-bar-release": "cypress run --env team=foo,product=bar,env=release",
    "foo-bar-production": "cypress run --env team=foo,product=bar,env=production",
  }
  ...
}
```

When run, it will specify only the test files in `cypress/integration/foo/bar`.

## How we use it

Follow all the steps above then:

### Add a new command to scripts

```json
// package.json
{
  ...
  "scripts": {
    ...
    "test": "npm run foo-bar-staging || npm run posttest"
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

then `configs/foo/bar/daily.json` is used and merged with `./cypress.json`.

This gives you an extra level of configuration for different test types where you need to target only specific spec files, all while keeping the package.json scripts part clean

<br />

#### fixtures/foo/bar/routes.json

Here is the place to define your `baseUrl` per each environment. See bellow where you can configure default environments when Hygen is run.

<br />

#### cypress/integration/foo/bar/

Here are your spec files as usual.

<br />

#### cypress/support/foo/bar/

Your projects commands are here.

> If you have multiple projects, keep in mind that you will have access only to the commands from the `team + project` you've run in the CLI.
> This is done so that commands from multiple products do not override each other if they're the same name.

<br />

### Local config

Create a file `cypress.local.json` inside ./configs/. Your local config will be then merged with the products config and global cypress.json.

It is ignored by GIT.

## Project flow

### Adding new custom scripts to package.json

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
    "foo-bar-staging": "cypress run --env team=foo,product=bar,env=staging",
    "bar-master-daily": "cypress run --env product=bar,env=master,type=daily",
    "bar-staging-weekly": "cypress run --env product=bar,env=staging,type=weekly"
  }
}
```

There is no need to specify test files. If test files are not specified they'll be automatically set(depending on `team` and `product` from CLI).

## Hygen part

Hygen is used to generate templates and inject code into your structure when running `npm run add-project`.

> You can modify the generator in `./_templates/project/with-prompt/`.
> <br/>

If you need to change default environments, they're declared in these files:

- `./_templates/project/with-prompt/fixtures.ejs.t`
- `./_templates/project/with-prompt/package.ejs.t`

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

Reports are deployed to [report-example.optimumqa.com](https://report-example.optimumqa.com)

Rules for triggering build and deploy:

- Pull request to `main` branch
- Push to `main` branch

### Github Actions & Pages

`.github/workflows/build-report.yml` is enabled.

It uses the "npm run test" command to run tests, so make sure you enable it or configure it to your needs.

Example:

```json
{
  "test": "npm run your-product-staging || npm run posttest"
}
```

After running `posttest`, it will deploy the reports in `cypress/reports/mochawesome` to your github page that you've configured.

#### Custom domain

If you have a custom domain, configure it in the `./CNAME`.

Example

```
subdomain.your-domain.com
```

After tests are run, this file will be copied to report location automatically.

To see how to configure Github pages in the repository settings, see [Github pages docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

## Summary

- Project is dynamically set up based on the four arguments above
- If you specify `baseURL` or `testFiles` in configs, they will not be overwritten.

## 🤝 Contributing

Contributions, issues and feature requests are welcome.<br />
Feel free to check [issues page](https://github.com/optimumqa/cypress-boilerplate/issues) if you want to contribute.<br />

## Show your support

Please ⭐️ this repository if this project helped you!

## 📝 License

This project is [MIT](https://github.com/optimumqa/cypress-boilerplate/blob/main/LICENSE) licensed.
