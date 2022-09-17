/// <reference types="cypress" />

export default (on, config) => {
  config = require('@optimumqa/cypress-setup-utilities')(on, config)

  return config
}
