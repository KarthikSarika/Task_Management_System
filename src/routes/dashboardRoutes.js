import express from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', isAuthenticated, getDashboard);

export default router;
