import express from 'express';
import { addMessage, getMessages, deleteMessage } from '../Controllers/MessageController.js';

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', getMessages);

router.delete('/:messageId', deleteMessage)

export default router;