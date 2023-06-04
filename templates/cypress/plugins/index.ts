/// <reference types="cypress" />
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

export default (on, config) => {
  config = require('@optimumqa/cypress-setup-utilities')(on, config)
  require('@optimumqa/cypress-store')(on, config)

  allureWriter(on, config);

  return config
}
