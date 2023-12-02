import express from 'express';
import { addComment, createPost, deleteComment, deletePost, getPost, getTimelinePosts, likePost, updateComment, updatePost } from '../Controllers/PostController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like', likePost);
router.get('/:id/timeline', getTimelinePosts);
router.put('/:id/comment', addComment);
router.put('/:id/commentDelete', deleteComment);
router.put('/:id/commentUpdate', updateComment);


export default router;