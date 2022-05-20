const product = Cypress.env('PRODUCT')
const team = Cypress.env('TEAM')
const productRaw = Cypress.env('originalConfig').product
const env = Cypress.env('ENV')
const type = Cypress.env('TYPE')

export const product
export const team
export const productRaw
export const env
export const type

export const getUrl = ({ _product, _team, _name }) => {
  const routes = cy.fixtures(`${_team ? _team + '/' : ''}${_product}/routes.json`)
  return routes[env][_product][_name]
}
