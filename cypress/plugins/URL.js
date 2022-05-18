/// <reference types="cypress" />

// Fixtures
const routes = require('../fixtures/routes')

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
    let { env, product } = config.env

    if (!env) {
      env = 'staging'
    }

    if (!product) {
      product = 'default'
    }

    this.CONFIG.env = env
    this.CONFIG.product = product

    this.set(config)

    if (this.CONFIG.logging) {
      console.log('[Plugin:URL] config.baseUrl: ', config.baseUrl)
      console.log('[Plugin:URL] config.env.baseUrl: ', config.env.baseUrl)
    }
  }

  set(config) {
    let set = false
    if (!config.env.rawConfig.product) {
      if (config.baseUrl) {
        this.url = config.baseUrl
        config.env.baseUrl = this.url
        set = true
      } else if (config.env.baseUrl) {
        this.url = config.env.baseUrl
        config.baseUrl = this.url
        set = true
      }
    }

    if (!set) {
      this.url = routes[this.CONFIG.env].products[this.CONFIG.product].baseUrl
      config.baseUrl = this.url
      config.env.baseUrl = this.url
    }

    return this.url
  }

  get() {
    return this.url
  }
}

module.exports = URL
