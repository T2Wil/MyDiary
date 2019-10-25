/* eslint-disable import/prefer-default-export */
import Entry from '../models/Entry';

const entry = new Entry();

export const createEntry = (req, res) => {
  const { title, description } = req.body;
  const createdEntry = entry.createEntry(title, description);
  if (createdEntry) {
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
  const { entryId } = req.params;
  const modifiedEntry = entry.modifyEntry(entryId);
  if (modifiedEntry) {
    modifiedEntry.message = 'entry successfully edited';
    res.status(200).json({
      status: res.statusCode,
      data: modifiedEntry,
    });
  } else {
    res.status(304).json({
      status: res.statusCode,
      error: 'Entry not modified',
    });
  }
};

export const viewEntries = (req, res) => {
  const entries = entry.getEntries();
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
  const { entryId } = req.params;
  const specificEntry = entry.getSpecificEntry(entryId);
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
  const deletedEntry = entry.deleteEntry(entryId);
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
