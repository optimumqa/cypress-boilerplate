# cypress-multi-product-template

## Project structure

```
- cypress/

  - configs/
    - default/
    - cypress.local.json
  - downloads/
  - fixtures/
  - integration/
    - default/
      - web/
      - mobile/
  - plugins/
  - screenshots/
  - support/
    - tid100/
      - commands.ts
  - videos/
```

## Local config

### Manual

Create a file `cypress.local.json` inside ./configs/. Your local config will be then merged with cypress.json

### CLI

`grunt exec:generateLocalConfig`

## Developing

### Adding a new product

#### CLI

Example
`grunt exec:addProduct:myProduct`

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

You can modify this in `./GruntFile.js`

#### Manual

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
| `product` | `String` | `default` | Product name                                                                                         |
| `env`     | `String` | `staging` | Any environment you support                                                                          |
| `type`    | `String` | `default` | Used for targeting specific config inside `configs/productName/`. Daily, weekly, smoke, you name it. |

Command Naming convention

- `product+environment+type`

Here are some example commands:

```json
{
  "scripts": {
    "myProduct-staging": "cypress run --env product=myProduct,env=staging",
    "myProduct-master-daily": "cypress run --env product=myProduct,env=master,type=daily",
    "myProduct2-staging-weekly": "cypress run --env product=myProduct2,env=staging,type=weekly"
  }
}
```

(NOTE) There is no need to specify test files.

Behind the scenes:

- `plugins/index.js` - Starting point
- `plugins/Config.js` - CLI Arguments are being processed
- Global config `./cypress.json` is merged with `cypress/config/${product}/${type}.json`
- If `product` is not specified,`cypress.local.json` will be used if it exists
- If neither of the three above configs has `testFiles` specified, the're automatically created and pointing to `integration/${product}/**/*`
- If `baseUrl` is not specified in either of the three above configs, it's created automatically
- `baseUrl` is retrieved from `fixtures/routes.json`
- If `product` is not specified, `baseUrl` will be set to `routes[env].products.default.baseUrl`

Summary

- Project is dynamically set up based on the three CLI Arguments above
- If you specify baseURL or testFiles they will not be overwritten
