/// <reference types="cypress" />

class URL {
  constructor(on, config, pluginConfig) {
    this.url = ''

    this.CONFIG = {
      ...{
        logging: false,
      },
      ...(pluginConfig || {}),
    }

    this.init(on, config, pluginConfig)
  }

  init(on, config, pluginConfig) {
    this.set(config)

    if (this.CONFIG.logging) {
      console.log('[Plugin:URL] baseUrl: ', config.baseUrl)
    }
  }

  set(config) {
    if (!config.baseUrl) {
      let { product, team, env } = config.env
      const routes = require(`../fixtures/${team ? team + '/' : ''}${product}/routes.json`)

      this.url = routes[env].baseUrl
      config.baseUrl = this.url
      config.env.baseUrl = this.url
    }
  }
}

module.exports = URL
