import { Observer, Store } from 'le5le-store';
import { TopologyData } from './models/data';

export class Layer {
  protected TID: string;
  protected data: TopologyData;
  subcribe: Observer;
  constructor(TID: string) {
    this.TID = TID;
    this.subcribe = Store.subscribe(this.generateStoreKey('topology-data'), (val) => {
      this.data = val;
    });
  }

  protected generateStoreKey(key) {
    return `${this.TID}-${key}`;
  }

  destroy() {
    this.subcribe.unsubscribe();
  }
}
