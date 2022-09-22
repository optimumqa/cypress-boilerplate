/// <reference types="cypress" />
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter'

export default (on, config) => {
  config = require('@optimumqa/cypress-setup-utilities')(on, config)

  installLogsPrinter(on, {
    printLogsToConsole: 'always',
    collectTestLogs: () => console.log('a'),
    includeSuccessfulHookLogs: false,
  })

  return config
}
