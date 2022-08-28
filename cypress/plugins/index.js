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

      const _config = plugin.name === 'URL' ? PLUGINS.get('Config').instance.get() : config

      plugin.instance = new _plugin(on, _config, plugin.config)
    }
  })

  console.log('[Plugin:Index] Generated config: \n', PLUGINS.get('Config').instance.get())

  return PLUGINS.get('Config').instance.get()
}
