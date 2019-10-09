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
};

export const viewEntries = (req, res) => { 
};
export const viewSpecificEntry = (req, res) => {
};
export const deleteEntry = (req, res) => {
};
