import express from 'express'
import { sendToTelegramBot } from '../Controllers/SupportController.js';

const router = express.Router()

router.post('/', sendToTelegramBot);

export default router;