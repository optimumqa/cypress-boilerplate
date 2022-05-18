import routes from '../fixtures/routes'

export const product = Cypress.env('PRODUCT')
export const productRaw = Cypress.env('rawConfig').product
export const env = Cypress.env('ENV')
export const type = Cypress.env('TYPE')

export const getUrl = (product) => {
  return routes[env].products[product].baseUrl || Cypress.env('baseUrl')
}
