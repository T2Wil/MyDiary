class Storage {
  constructor() {
    this.database = [];
  }

  addEntry(userId, entry) {
    const numberOfUsers = this.database.length;

    for (let index = 0; index < numberOfUsers; index += 1) {
      const alreadyHasEntries = this.database[index].userId === userId;
      if (alreadyHasEntries) {
        this.database[index].entries.push({
          id: entry.id,
          title: entry.title,
          description: entry.description,
          createdOn: entry.createdOn,
        });
        return true;
      }
    }
    this.database.push({
      userId,
      entries: [
        {
          id: entry.id,
          title: entry.title,
          description: entry.description,
          createdOn: entry.createdOn,
        },
      ],
    });
    return true;
  }

  getEntries(userId) {
    try {
      return (this.database.find((entries) => entries.userId === userId)).entries;
    } catch (err) {
      return false;
    }
  }

  updateEntry(userId, modifiedEntry) {
    for (let index = 0; index < this.database.length; index += 1) {
      if (this.database[index].userId === userId) {
        const { entries } = this.database[index];
        for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
          if (entries[entryIndex].id === modifiedEntry.id) {
            const oldEntry = this.database[index].entries[entryIndex];
            const { id, title, description } = modifiedEntry;
            Object.assign(oldEntry, { id, title, description });
            const savedEntry = this.database[index].entries[entryIndex];
            return savedEntry;
          }
        }
      }
    }
    return false;
  }

  deleteEntry(userId, entryId) {
    for (let index = 0; index < this.database.length; index += 1) {
      if (this.database[index].userId === userId) {
        const { entries } = this.database[index];
        for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
          if (entries[entryIndex].id === entryId) {
            this.database[index].entries.splice(entryIndex, 1);
            return true;
          }
        }
      }
    }
    return false;
  }

  getSpecificEntry(userId, entryId) {
    for (let index = 0; index < this.database.length; index += 1) {
      if (this.database[index].userId === userId) {
        const { entries } = this.database[index];
        for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
          if (entries[entryIndex].id === entryId) {
            return entries[entryIndex];
          }
        }
      }
    }
    return false;
  }
}
export default Storage;
