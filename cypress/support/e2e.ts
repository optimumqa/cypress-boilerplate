import e2eCommands from './e2e/commands'
import installLogsCollector from 'cypress-terminal-report/src/installLogsCollector'

/**
 * Main function
 * Initializes global commands
 */
const initialize = () => {
  installLogsCollector()

  // Initialize e2e commands
  Object.keys(e2eCommands).forEach((name) => {
    Cypress.Commands.add(name, e2eCommands[name])
  })

  Cypress.on('uncaught:exception', (_err, _runnable) => {
    return false
  })

  Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
      let item = runnable
      const nameParts = [runnable.title]

      while (item.parent) {
        nameParts.unshift(item.parent.title)
        item = item.parent
      }

      const fullTestName = nameParts.filter(Boolean).join(' -- ')

      const imageUrl = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`

      addContext({ test }, imageUrl)
    }
  })
}

initialize()
