export const product = Cypress.env('PRODUCT')
export const env = Cypress.env('ENV')
export const type = Cypress.env('TYPE')
export const baseUrl = Cypress.config('e2e').baseUrl

const getProductPath = () => {
  return `${product}`
}

export const getFixture = (fileName) => {
  try {
    return require(`../fixtures/${getProductPath()}/${fileName}.json`)
  } catch (error) {
    console.warn('users.local.json not existing')
  }
}

export const routes = getFixture('routes').envs[env]

const tmpUsers = getFixture('users')[env]
const localUsersFile = getFixture('users.local');
const localUsers = localUsersFile && localUsersFile[env];
// This avoids using the same user when there are concurrent jobs and prevents tests from failing
// Add a random number after user email
// eg. test@gmail.com -> test+394@gmail.com
// tmpUsers.primary.email = tmpUsers.primary.email.replace('@', `+${Math.floor(Math.random() * 1000)}@`)

tmpUsers.primary.name = (
  Cypress.env('SECONDARY_USER') ||
  (localUsers && localUsers.primary.name) ||
  tmpUsers.primary.name
).toLowerCase();

tmpUsers.secondary.name = (
  Cypress.env('SECONDARY_USER_PW') ||
  (localUsers && localUsers.primary.name) ||
  tmpUsers.secondary.name
).toLowerCase();

tmpUsers.primary.password =
  Cypress.env('PRIMARY_USER') || (localUsers && localUsers.primary.password) || tmpUsers.primary.password;

tmpUsers.secondary.password =
  Cypress.env('PRIMARY_USER_PW') || (localUsers && localUsers.primary.password) || tmpUsers.secondary.password;

export const users = tmpUsers

export const getUrl = (name) => {
  if (name === 'baseUrl' || !name) {
    return baseUrl;
  }

  let path = '';
  const commonPaths = getFixture('routes').commonPaths;
  if (name in commonPaths) {
    path = commonPaths[name];
  }

  if (name in routes) {
    path = routes[name];
  }

  return `${baseUrl}${path}`;
};
