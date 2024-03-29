import e2eCommands from './e2e/commands'

/**
 * Main function
 * Initializes global commands
 */
const initialize = () => {
  // Initialize e2e commands
  Object.keys(e2eCommands).forEach((name: any) => {
    Cypress.Commands.add(name, e2eCommands[name])
  })

  Cypress.on('uncaught:exception', () => {
    return false
  })

  // Display spec file name on top of suite
  Cypress.Allure.reporter.getInterface().defineSuiteLabels((titlePath, fileInfo) => {
    titlePath[0] = `${fileInfo.name} | ${titlePath[0]}`;
    return titlePath;
  });
}

initialize()
