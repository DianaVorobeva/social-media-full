import express from 'express'
import { getSearchArray } from '../Controllers/SearchController.js';

const router = express.Router()

router.get('/:text', getSearchArray);

export default router;