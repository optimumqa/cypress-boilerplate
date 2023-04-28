/// <reference types="cypress-iframe" />

import 'cypress-localstorage-commands'
import 'cypress-iframe'

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
