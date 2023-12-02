import express from 'express'
import { createChat, deleteChat, findChat, userChats } from '../Controllers/ChatController.js';
const router = express.Router()

router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.delete('/:chatId', deleteChat)

export default router;