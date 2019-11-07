import generateId from 'uuid/v1';
import { instantTime } from '../helpers/utils';

class Entry {
  constructor() {
    this.id = 0;
    this.createdOn = new Date();
    this.title = '';
    this.description = '';
  }

  createEntry(title, description) {
    this.title = title || 'UNTITLED';
    this.description = description || 'NO DESCRIPTION';
    this.id = generateId();
    this.createdOn = instantTime();
    return this.getEntry();
  }

  getEntry() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdOn: this.createdOn,
    };
  }
}

export default Entry;
