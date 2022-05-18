/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Gets element using the data-cy attribute
     */
    dataCy(value: string): Chainable<Element>
  }
}
