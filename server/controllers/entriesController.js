import Entry from '../models/Entry';
import Storage from '../models/Storage';

const entry = new Entry();
const storage = new Storage();

export const createEntry = (req, res) => {
  const { userId, title, description } = req.body;
  const createdEntry = entry.createEntry(title, description);
  const updatedStorage = storage.addEntry(userId, createdEntry);

  if (createdEntry && updatedStorage) {
    createdEntry.message = 'entry successfully created';
    res.status(200).json({
      status: res.statusCode,
      data: createdEntry,
    });
  } else {
    res.status(500).json({
      status: res.statusCode,
      error: 'Internal server error',
    });
  }
};

export const updateEntry = (req, res) => {
  const { userId } = req.body;
  const { entryId } = req.params;
  const entryChanges = req.body;
  entryChanges.id = entryId;
  const updatedEntry = storage.updateEntry(userId, entryChanges);
  if (updatedEntry) {
    res.status(200).json({
      status: res.statusCode,
      message: 'entry successfully edited',
      data: updatedEntry,
    });
  } else {
    res.status(404).json({
      status: res.statusCode,
      error: 'Entry doesn\'t exists',
    });
  }
};

export const viewEntries = (req, res) => {
  const { userId } = req.body;
  const page = req.query.page || 1;
  const entriesPerPage = 5;
  let entries = storage.getEntries(userId);
  const totalEntries = entries.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const firstEntryIndex = (page * entriesPerPage) - entriesPerPage;
  const lastEntryIndex = firstEntryIndex + entriesPerPage;
  try {
    entries = entries.slice(firstEntryIndex, lastEntryIndex);
    if (entries) {
      res.status(200).json({
        status: res.statusCode,
        totalEntries,
        pages: `Page ${page} of ${totalPages}`,
        data: entries,
      });
    } else {
      res.status(500).json({
        status: res.statusCode,
        error: 'Internal server error',
      });
    }
  } catch (err) {
    res.status(200).json({
      status: res.statusCode,
      userId,
      data: [],
    });
  }
};
export const viewSpecificEntry = (req, res) => {
  const { userId } = req.body;
  const { entryId } = req.params;
  const specificEntry = storage.getSpecificEntry(userId, entryId);
  if (specificEntry) {
    res.status(200).json({
      status: res.statusCode,
      data: {
        userId,
        specificEntry,
      },
    });
  } else {
    res.status(404).json({
      status: res.statusCode,
      error: 'Entry doesn\'t exists',
    });
  }
};
export const deleteEntry = (req, res) => {
  const { entryId } = req.params;
  const { userId } = req.body;
  const deletedEntry = storage.deleteEntry(userId, entryId);
  if (deletedEntry) {
    res.status(200).json({
      status: res.statusCode,
      data: {
        message: 'entry successfully deleted',
      },

    });
  } else {
    res.status(404).json({
      status: res.statusCode,
      error: 'Entry doesn\'t exists',
    });
  }
};
