/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  config = require('@optimumqa/cypress-setup-utilities')(on, config)

  return config
}
