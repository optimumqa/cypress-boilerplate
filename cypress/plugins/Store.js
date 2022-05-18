const StoreHelper = require('../support/Store')
const stores = {}

class Store {
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
    on('task', {
      /**
       * @description - Store items to specific store. If store does not exist, it will be created
       *
       * @param {String} data.id - Store id
       * @param {Object} data.item - Object containing item info
       * @param {String} data.item.name - Item name
       * @param {Any} data.item.value - Item value
       *
       * @returns {Store.Item|Null}
       */
      setItem: (data) => {
        let store = stores[data.storeId]
        if (!store) {
          stores[data.storeId] = new StoreHelper()
          store = stores[data.storeId]
        }

        return store.setItem(data.item) || null
      },

      /**
       * @description - Get items from specific store
       *
       * @param {String} data.id - Store id
       * @param {Object} data.item - Object containing item info
       * @param {String} data.item.name - Item name
       *
       * @returns {Store.Item|Null}
       */
      getItem: (data) => {
        const store = stores[data.storeId]
        if (store) {
          return store.getItem(data.item)
        }

        return null
      },
    })
  }
}

module.exports = Store
