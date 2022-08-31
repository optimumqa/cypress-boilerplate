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
