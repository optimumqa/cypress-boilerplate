/// <reference types="cypress" />

const PLUGINS = {
  list: [
    {
      name: 'DeletePassedVideo',
      enabled: true,
      config: {},
      instance: null,
    },
    {
      name: 'Store',
      enabled: true,
      config: {},
      instance: null,
    },
    {
      name: 'Config',
      enabled: true,
      config: {},
      instance: null,
    },
    {
      name: 'URL',
      enabled: true,
      config: {},
      instance: null,
    },
  ],

  get(name) {
    return this.list.find((plugin) => plugin.name === name)
  },
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  /**
   * Initialize all enabled plugins
   */
  PLUGINS.list.forEach((plugin) => {
    if (plugin.enabled) {
      const _plugin = require(`./${plugin.name}`)

      plugin.instance = new _plugin(on, config, plugin.config)
    }
  })

  return PLUGINS.get('Config').instance.get()
}
