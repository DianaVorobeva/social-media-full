import express from 'express';
import { followUser, deleteUser, getUser, updateUser, unFollowUser, getAllUsers } from '../Controllers/UserController.js';
import authMiddleWare from '../Middleware/authMiddleWare.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/',getAllUsers)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put('/:id/unfollow',authMiddleWare, unFollowUser)

export default router;