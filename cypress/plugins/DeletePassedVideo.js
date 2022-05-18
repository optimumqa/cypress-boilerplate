const _ = require('lodash')
const del = require('del')

class DeletePassedVideo {
  constructor(on, config, pluginConfig) {
    this.CONFIG = {
      ...{
        logging: false,
      },
      ...(pluginConfig || {}),
    }

    this.init(on, config, pluginConfig)
  }

  init(on, config, pluginConfig) {
    on('after:spec', (spec, results) => {
      if (results && results.video) {
        const failures = _.some(results.tests, (test) => {
          return _.some(test.attempts, { state: 'failed' })
        })
        if (!failures) {
          return del(results.video)
        }
      }
    })
  }
}

module.exports = DeletePassedVideo
