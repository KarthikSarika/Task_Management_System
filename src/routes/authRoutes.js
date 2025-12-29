import express from 'express';
import { registerPage, loginPage, register, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/register', registerPage);
router.get('/login', loginPage);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

export default router;
