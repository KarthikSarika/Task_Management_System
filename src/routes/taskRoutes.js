import express from 'express';
import {
    getTasks,
    getCreateTask,
    createTask,
    getTaskDetails,
    getUpdateTask,
    updateTask,
    getDeleteConfirmation,
    deleteTask
} from '../controllers/taskController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getTasks);
router.get('/create', getCreateTask);
router.post('/create', createTask);
router.get('/:id', getTaskDetails);
router.get('/:id/edit', getUpdateTask);
router.post('/:id/edit', updateTask);
router.get('/:id/delete', getDeleteConfirmation);
router.post('/:id/delete', deleteTask);

export default router;
