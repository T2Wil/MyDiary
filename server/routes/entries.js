import express from 'express';
import {
  createEntry, updateEntry,
  viewEntries, viewSpecificEntry, deleteEntry,
} from '../controllers/entriesController';
import verifyToken from '../middleware/verifyToken';
import { validateNewEntry } from '../middleware/validator';

const router = express.Router();

router.post('/', verifyToken, validateNewEntry, createEntry);
router.patch('/:entryId', verifyToken, updateEntry);
router.delete('/:entryId', verifyToken, deleteEntry);
router.get('/', verifyToken, viewEntries);
router.get('/:entryId', verifyToken, viewSpecificEntry);
export default router;
