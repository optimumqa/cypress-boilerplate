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
    console.log(config)
    this.set(config)

    if (this.CONFIG.logging) {
      console.log('[Plugin:URL] baseUrl: ', config.baseUrl)
    }
  }

  set(config) {
    if (!config.baseUrl) {
      let { PRODUCT, TEAM, ENV } = config.env
      const routes = require(`../fixtures/${TEAM ? TEAM + '/' : ''}${PRODUCT}/routes.json`)

      this.url = routes[ENV].baseUrl
      config.baseUrl = this.url
    }
  }
}

module.exports = URL
