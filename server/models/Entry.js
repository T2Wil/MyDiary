/* eslint-disable linebreak-style */
import { generateId, instantTime } from '../helpers/utils';

class Entry {
  constructor() {
    this.id = 0;
    this.createdOn = '';
    this.title = '';
    this.description = '';
    this.entries = [];
  }

  createEntry(title, description) {
    this.title = title;
    this.description = description;
    this.id = generateId();
    this.createdOn = instantTime();
    this.entries.push(this.getEntry());
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

  getEntries() {
    return this.entries.sort((entry1, entry2) => entry1.id - entry2.id);
  }

  deleteEntry(id) {
    const entryOfInterest = this.entries.find((entry) => String(entry.id) === id);
    const entryLocation = this.entries.indexOf(entryOfInterest);
    this.entries.splice(entryLocation, 1);
    return entryOfInterest;
  }

  editEntry(id, entry) {
    const title = { entry } || null;
    const description = { entry } || null;
    if (title || description) {
      const selectedEntry = this.entries.find((savedEntry) => savedEntry.id === id);
      const selectedEntryLocation = this.entries.indexOf(selectedEntry);
      if (title) { selectedEntry.title = title; }
      if (description) { selectedEntry.description = description; }
      this.entries[selectedEntryLocation] = selectedEntry;
      return true;
    }
    return false;
  }

  modifyEntry(id) {
    return this.entries.find((savedEntry) => String(savedEntry.id) === id);
  }

  getSpecificEntry(id) {
    return this.entries.find((savedEntry) => String(savedEntry.id) === id);
  }
}

export default Entry;
