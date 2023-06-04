import { storeItems, storeItem } from './storeTypes';
import StoreItem from './storeItem';

export default class SmallStore {
  items: storeItems = [];
  setItem: any;
  getItem: any;
  updateItem: any;
  deleteItem: any;
  getAllItems: any;

  constructor() {
    this.setItem = (data: storeItem) => {
      const item = new StoreItem(data);
      this.items.push(item);

      return item;
    };

    this.updateItem = (data: { source: string; value: any }) => {
      const index = this.items.findIndex((x) => x.name === data.source);
      if (index > -1) {
        this.items[index].value = {
          ...this.items[index].value,
          ...data.value.value,
        };

        this.items[index].name = data.value.name || this.items[index].name;
      } else {
        throw new Error(`Could not find index of element ${data.source}.`);
      }
    };

    this.getItem = (source: string) => this.items.find((x) => x.name === source);

    this.deleteItem = (source: string) => {
      const index = this.items.findIndex((x) => x.name === source);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        throw new Error(`Could not find index of element ${source}.`);
      }
    };

    this.getAllItems = () => {
      return this.items;
    };

    return this;
  }
}
