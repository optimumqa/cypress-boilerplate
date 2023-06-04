import 'cypress-localstorage-commands'
import 'cypress-iframe'
import '@shelex/cypress-allure-plugin';
import 'cypress-plugin-api';
import 'cypress-plugin-steps';

// Hygen - ScriptsImport - Do not remove this comment

// Hygen - Do not remove this comment and do not rename below object `productsCommands`
const productsCommands = {
  ...{}, // Hygen - ObjectInsertion - Do not remove this line
}

const getProductCommands = () => {
  return productsCommands[`${Cypress.env('product')}`][`${Cypress.env('product')}`]
}

// Shared commands (always loaded)
const commands = {}

export default {
  ...commands, //
  ...getProductCommands(),
}
