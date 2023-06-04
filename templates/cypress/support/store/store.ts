import { storeItem } from './storeTypes';
import SmallStore from './smallStore';

const stores: {
  [key: string]: SmallStore;
} = {};

export default class Store {
  CONFIG = {};
  setItem: any;
  getItem: any;
  getAllItems: any;
  updateItem: any;
  deleteItem: any;
  removeAllItems: any;
  storeExists: any;

  constructor(pluginConfig: object) {
    this.CONFIG = {
      ...{
        log: false,
      },
      ...(pluginConfig || {}),
    };

    /**
     * @description - Store items to specific store. If store does not exist, it will be created
     *
     * @param {String} data.storeId - Store id
     * @param {Object} data.item - Object containing item info
     * @param {String} data.item.name - Item name
     * @param {Object} data.item.value - Item value
     *
     * @returns {Store.Item|Null}
     */
    this.setItem = (data: { storeId: string; item: storeItem }) => {
      const { storeId, item } = data;

      let store = stores[storeId];
      if (!store) {
        stores[storeId] = new SmallStore();
        store = stores[storeId];
      }

      return store.setItem(item) || null;
    };

    /**
     * Updates an item by name
     */
    this.updateItem = (data: { storeId: string; source: object; value: object }) => {
      const { storeId, source, value } = data;
      let store = stores[storeId];
      store.updateItem({ source, value });
    };

    /**
     * @description - Get items from specific store
     *
     * @param {String} data.id - Store id
     * @param {Object} data.item - Object containing item info
     * @param {String} data.item.name - Item name
     *
     * @returns {Store.Item|Null}
     */
    this.getItem = (data: { storeId: string; source: string }) => {
      const { storeId, source } = data;

      return stores[storeId].getItem(source);
    };

    this.getAllItems = (data: { storeId: string }) => {
      return stores[data.storeId].getAllItems();
    };

    this.deleteItem = (data: { storeId: string; source: string }) => {
      return stores[data.storeId].deleteItem(data.source);
    };

    this.removeAllItems = () => {};

    this.storeExists = (storeId: string) => {
      return storeId in stores;
    };

    return this;
  }
}
