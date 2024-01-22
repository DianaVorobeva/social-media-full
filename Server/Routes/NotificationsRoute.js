import express from 'express';
import { addEvent, getAllNotifications, deleteNotification } from '../Controllers/NotificationsController.js';

const router = express.Router();

router.post('/', addEvent);

router.get('/getAll', getAllNotifications);

router.delete('/:senderId', deleteNotification)

export default router;