/**
 * @typedef {object} Store
 * @property {array<Item>>} items
 */
class Store {
  items: object

  /**
   * @returns {Store}
   */
  constructor() {
    /** @type {object} */
    this.items = {}

    return this.getInstance()
  }

  /**
   * Return store instance
   *
   * @returns {Store}
   */
  getInstance(): Store {
    return this
  }

  /**
   * Gets item by name
   * @param {object} data
   * @param {string} data.name
   *
   * @returns {Item}
   */
  getItem(data: object = {}) {
    return this.items[data.name] || null
  }

  /**
   * Stores item
   *
   * @param {object} data
   * @param {string} data.name
   * @param {string} data.value
   *
   * @returns {Item}
   */
  setItem(data: object = {}) {
    this.items[data.name] = new Item(data)

    return this.items[data.name]
  }
}

/**
 * @typedef {object} Item
 * @property {string} name - Item name
 * @property {any} value - Item value
 */
class Item {
  name: string
  value: any

  /**
   *
   * @param {object} data
   * @param {string} data.name
   *
   * @returns {Item}
   */
  constructor(data: object) {
    this.name = data.name || ''
    this.value = data.value || undefined

    return this.getInstance()
  }

  getInstance(): Item {
    return this
  }
}

module.exports = Store
