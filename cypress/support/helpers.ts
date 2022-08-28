export const product = Cypress.env('PRODUCT')
export const team = Cypress.env('TEAM')
export const env = Cypress.env('ENV')
export const type = Cypress.env('TYPE')
export const baseUrl = Cypress.config('baseUrl')

export const getUrl = (name) => {
  const routes = require(`../fixtures/${team ? team + '/' : ''}${product}/routes.json`)
  return routes[env][name]
}

export const getCustomUrl = ({ _product, _team, _name }) => {
  const routes = require(`../fixtures/${_team ? _team + '/' : ''}${_product}/routes.json`)
  return routes[env][_name]
}
