const fs = require('fs-extra')
const path = require('path')

class Config {
  constructor(on, config, pluginConfig) {
    this.finalConfig = {}

    this.CONFIG = {
      ...{
        logging: false,
      },
      ...(pluginConfig || {}),
    }

    this.init(on, config, pluginConfig)
  }

  init(on, config, pluginConfig) {
    this.finalConfig = {}

    const configClone = JSON.parse(JSON.stringify(config.env))
    const originalConfig = {
      product: configClone.product,
      team: configClone.team,
      env: configClone.env,
      type: configClone.type,
    }

    let { product, team, env, type } = config.env

    if (!env) {
      env = 'staging'
    }

    if (!type) {
      type = 'default'
    }

    try {
      const myConfigPath = path.resolve('.', 'cypress/configs/', 'cypress.local.json')
      if (!config.env.product && fs.existsSync(myConfigPath)) {
        this.finalConfig = require(myConfigPath)
        if (this.CONFIG.logging) {
          console.log(`\n[Plugin:Config]: Local config found.`)
        }
      }
    } catch (error) {
      console.error(error)
    }

    if (!Object.keys(this.finalConfig).length) {
      this.finalConfig = require(path.resolve(
        '.',
        'cypress/configs',
        `${team ? team + '/' : ''}${product}/${type}.json`,
      ))
    }

    if (!this.finalConfig.testFiles || !this.finalConfig.testFiles.length) {
      this.finalConfig.testFiles = [`**/${team ? team + '/' : ''}${product}/**/*`]
    }

    if (!this.finalConfig.env) {
      this.finalConfig.env = {}
    }

    this.finalConfig.env.PRODUCT = product
    this.finalConfig.env.TEAM = team
    this.finalConfig.env.ENV = env
    this.finalConfig.env.TYPE = type
    this.finalConfig.env.originalConfig = originalConfig

    if (this.CONFIG.logging) {
      console.log('[Plugin:Config] Product: ', this.finalConfig.env.PRODUCT)
      console.log('[Plugin:Config] Team: ', this.finalConfig.env.PRODUCT)
      console.log('[Plugin:Config] Environment: ', this.finalConfig.env.ENV)
      console.log('[Plugin:Config] Type: ', this.finalConfig.env.TYPE)
      console.log('[Plugin:Config] Original config: ', JSON.stringify(this.finalConfig.env.originalConfig))
    }

    const baseConfig = require(path.join(config.projectRoot, './cypress'))
    this.finalConfig = { ...baseConfig, ...this.finalConfig }
    config.baseUrl = this.finalConfig.baseUrl

    if (this.CONFIG.logging) {
      console.log('[Plugin:Config] Config set:', this.finalConfig)
    }
  }

  get() {
    return this.finalConfig
  }
}

module.exports = Config
