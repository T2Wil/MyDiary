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

export const modifyEntry = (req, res) => {
  const { userId } = req.body;
  const { entryId } = req.params;
  const entryChanges = req.body;
  entryChanges.id = entryId;
  const updatedEntry = storage.modifyEntry(userId, entryChanges);
  if (updatedEntry) {
    res.status(200).json({
      status: res.statusCode,
      message:'entry successfully edited',
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
  const entries = storage.getEntries(userId);
  if (entries) {
    res.status(200).json({
      status: res.statusCode,
      data: entries,
    });
  } else {
    res.status(500).json({
      status: res.statusCode,
      error: 'Internal server error',
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
      data: specificEntry,
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
