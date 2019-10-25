/* eslint-disable linebreak-style */
class Storage {
  constructor() {
    this.database = [];
  }

  addEntries(accountId, entries) {
    this.database.push({
      accountId,
      entries,
    });
  }

  getEntries(accountId) {
    return this.database.find((entries) => entries.userId === accountId);
  }

  deleteEntries(accountId) {
    const accountOfInterest = this.database.find((account) => account.userId === accountId);
    const accountIdLocation = this.database.indexOf(accountOfInterest);
    this.database.splice(accountIdLocation, 1);
  }
}
export default Storage;
