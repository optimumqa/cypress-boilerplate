import { storeItem } from './storeTypes';

export default class Item {
  name: string;
  value: any;

  constructor(data: storeItem) {
    this.name = data.name || '';
    this.value = data.value || undefined;

    return this;
  }
}
