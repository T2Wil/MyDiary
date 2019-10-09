/* eslint-disable import/named */
import express from 'express';
import {
  createEntry, modifyEntry,
  viewEntries, viewSpecificEntry, deleteEntry,
} from '../controllers/entriesController';
import { verifyToken } from '../middleware/token';

const router = express.Router();

router.post('/', verifyToken, createEntry);
router.patch('/:entryId', verifyToken, modifyEntry);
router.delete('/:entryId', verifyToken, deleteEntry);
router.get('/', verifyToken, viewEntries);
router.get('/:entryId', verifyToken, viewSpecificEntry);
export default router;