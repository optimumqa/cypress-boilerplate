const moment = require('moment')
import '@testing-library/cypress/add-commands'
import 'cypress-localstorage-commands'
// https://github.com/bahmutov/cypress-if
import 'cypress-if'

// Hygen - ScriptsImport - Do not remove this comment

// Hygen - Do not remove this comment and do not rename below object `productsCommands`
const productsCommands = {
  ...{}, // Hygen - ObjectInsertion - Do not remove this line
}

const getProductCommands = () => {
  return productsCommands[`${Cypress.env('product')}`]
}

const commands = {}

export default {
  ...commands, //
  ...getProductCommands(),
}
