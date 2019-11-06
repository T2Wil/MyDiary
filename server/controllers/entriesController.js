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
    if (entries.length) {
      res.status(200).json({
        status: res.statusCode,
        totalEntries,
        pages: `Page ${page} of ${totalPages}`,
        userId,
        data: entries,
      });
    }
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!',
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message,
    });
  }
};
export const viewSpecificEntry = async (req, res) => {
  try {
    const { userId } = req.body;
    const { entryId } = req.params;
    const { rows } = await database.viewSpecificEntry(userId, entryId);
    let retrievedEntry = rows;
    retrievedEntry = retrievedEntry.map((entryInfo) => ({
      createdOn: entryInfo.createddate,
      entryId: entryInfo.entryid,
      title: entryInfo.title,
      description: entryInfo.description,
    }));
    if (retrievedEntry.length) {
      res.status(200).json({
        status: res.statusCode,
        data: {
          userId,
          entry: retrievedEntry,
        },
      });
    }
    res.status(404).json({
      status: res.statusCode,
      error: 'Not Found!',
    });
  } catch (err) {
    if (err.routine === 'string_to_uuid') {
      res.status(404).json({
        status: res.statusCode,
        error: 'Not Found!',
      });
    }
    res.status(500).json({
      status: res.statusCode,
      error: err,
    });
  }
};

export const updateEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const entryChanges = req.body;
    const { rows } = await database.updateEntry(entryId, entryChanges);
    const updatedEntry = rows[0];
    res.status(200).json({
      status: res.statusCode,
      message: 'entry successfully edited',
      data: updatedEntry,
    });
  } catch (err) {
    if (err.routine === 'string_to_uuid') {
      res.status(404).json({
        status: res.statusCode,
        error: 'Entry not found',
      });
    } else {
      res.status(500).json({
        status: res.statusCode,
        error: err.message,
      });
    }
  }
};

export const deleteEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const { rows } = await database.deleteEntry(entryId);
    const deletedEntry = rows[0];
    if (deletedEntry) {
      res.status(204).json({
        status: res.statusCode,
        message: 'entry successfully deleted',
        data: deletedEntry,
      });
    }
  } catch (err) {
    if (err.routine === 'string_to_uuid') {
      res.status(404).json({
        status: res.statusCode,
        error: 'Entry Not Found!',
      });
    }
    res.status(500).json({
      status: res.statusCode,
      error: err.message,
    });
  }
};
