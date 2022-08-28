import commands from './commands'

/**
 * Main function
 * Initializes global commands
 */
const initialize = () => {
  Object.keys(commands).forEach((name) => {
    Cypress.Commands.add(name, commands[name])
  })

  Cypress.on('uncaught:exception', (_err, _runnable) => {
    return false
  })
}

initialize()
