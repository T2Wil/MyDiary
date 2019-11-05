import Entry from '../models/Entry';
import Database from '../database/Database';

const entry = new Entry();
const database = new Database();

export const createEntry = async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const entriesTableCreated = await database.createEntriesTable();
    if (entriesTableCreated) {
      const formatedEntry = entry.createEntry(title, description);
      await database.addEntry(userId, formatedEntry);
      res.status(201).json({
        status: res.statusCode,
        userId,
        data: formatedEntry,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message,
    });
  }
};

export const viewEntries = async (req, res) => {
  try {
    const { userId } = req.body;
    const page = req.query.page || 1;
    const entriesPerPage = 5;
    const { rows } = await database.viewEntries(userId);
    let entries = rows;
    entries = entries.map((savedEntry) => ({
      entryId: savedEntry.entryid,
      createdOn: savedEntry.createddate,
      title: savedEntry.title,
      description: savedEntry.description,

    }));
    const totalEntries = entries.length;
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const firstEntryIndex = (page * entriesPerPage) - entriesPerPage;
    const lastEntryIndex = firstEntryIndex + entriesPerPage;
    entries = entries.slice(firstEntryIndex, lastEntryIndex);
    res.status(200).json({
      status: res.statusCode,
      totalEntries,
      pages: `Page ${page} of ${totalPages}`,
      userId,
      data: entries,
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message,
    });
  }
};
export const viewSpecificEntry = async (req, res) => {

};

export const updateEntry = async (req, res) => {
};

export const deleteEntry = async (req, res) => {

};
