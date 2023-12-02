import express from 'express';
import { LoginUser, registerUser } from '../Controllers/AuthController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', LoginUser)

export default router;