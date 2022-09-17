/// <reference types="@cypress-audit/lighthouse" />
/// <reference types="cypress-iframe" />

const moment = require('moment')
import 'cypress-localstorage-commands'
import 'cypress-if'
import 'cypress-iframe'

// Hygen - ScriptsImport - Do not remove this comment
import vares from './vares'

// Hygen - Do not remove this comment and do not rename below object `productsCommands`
const productsCommands = {
  ...{}, // Hygen - ObjectInsertion - Do not remove this line
  vares,
}

const getProductCommands = () => {
  return productsCommands[`${Cypress.env('product')}`]
}

const commands = {}

export default {
  ...commands, //
  ...getProductCommands(),
}
