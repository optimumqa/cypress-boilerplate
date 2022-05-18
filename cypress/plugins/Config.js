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
    const configClone = JSON.parse(JSON.stringify(config.env))
    const rawConfig = {
      product: configClone.product,
      env: configClone.env,
      type: configClone.type,
    }

    let { env, product, type } = config.env

    if (!env) {
      env = 'staging'
    }

    if (!product) {
      product = 'default'
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
      this.finalConfig = require(path.resolve('.', 'cypress/configs', `${product}/${type}.json`))
    }

    if (!this.finalConfig.testFiles || !this.finalConfig.testFiles.length) {
      if (product !== 'default') {
        this.finalConfig.testFiles = [`**/${product}/**/*`]
      } else {
        delete this.finalConfig.testFiles
      }
    }

    if (!this.finalConfig.env) {
      this.finalConfig.env = {}
    }

    this.finalConfig.env.ENV = env
    this.finalConfig.env.PRODUCT = product
    this.finalConfig.env.TYPE = type

    if (this.CONFIG.logging) {
      console.log('[Plugin:Config] Environment set: ', this.finalConfig.env.ENV)
      console.log('[Plugin:Config] Product set: ', this.finalConfig.env.PRODUCT)
      console.log('[Plugin:Config] Type set: ', this.finalConfig.env.TYPE)
    }

    const baseConfig = require(path.join(config.projectRoot, './cypress'))
    this.finalConfig = { ...baseConfig, ...this.finalConfig }
    this.finalConfig.env.rawConfig = rawConfig

    if (this.CONFIG.logging) {
      console.log('[Plugin:Config] Config set:', this.finalConfig)
    }
  }

  get() {
    return this.finalConfig
  }
}

module.exports = Config
