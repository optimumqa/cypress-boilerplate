export const product = Cypress.env('PRODUCT')
export const team = Cypress.env('TEAM')
export const env = Cypress.env('ENV')
export const type = Cypress.env('TYPE')
export const baseUrl = Cypress.config('e2e').baseUrl

const getProductPath = () => {
  return `${team ? team + '/' : ''}${product}`
}

export const getFixture = (fileName) => {
  return require(`../fixtures/${getProductPath()}/${fileName}.json`)
}

export const routes = getFixture('routes')[env]

const tmpUsers = getFixture('users')[env]
// This avoids using the same user when there are concurrent jobs and prevents tests from failing
// Add a random number after user email
// eg. test@gmail.com -> test+394@gmail.com
tmpUsers.primary.email = tmpUsers.primary.email.replace('@', `+${Math.floor(Math.random() * 1000)}@`)

export const users = tmpUsers

export const getUrl = (name) => {
  return getFixture('routes')[env][name]
}

export const getCustomUrl = ({ _product, _team, _name }) => {
  return getFixture('routes')[env][_name]
}
