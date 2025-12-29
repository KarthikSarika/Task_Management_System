import prisma from '../db.js';

export const getTasks = async (req, res) => {
    const userId = req.session.user.id;
    const { status, priority, search } = req.query;

    const where = { userId };
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }

    try {
        const tasks = await prisma.task.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        res.render('tasks/list.njk', { title: 'Your Tasks', tasks, filters: { status, priority, search } });
    } catch (error) {
        res.status(500).render('error.njk', { error });
    }
};

export const getCreateTask = (req, res) => {
    res.render('tasks/create.njk', { title: 'Create Task' });
};

export const createTask = async (req, res) => {
    const { title, description, priority, status, dueDate } = req.body;
    const userId = req.session.user.id;

    try {
        await prisma.task.create({
            data: {
                title,
                description,
                priority,
                status,
                dueDate: dueDate ? new Date(dueDate) : null,
                userId
            }
        });
        res.redirect('/tasks');
    } catch (error) {
        res.render('tasks/create.njk', { title: 'Create Task', error: error.message, values: req.body });
    }
};

export const getTaskDetails = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;

    try {
        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) return res.status(404).render('error.njk', { message: 'Task not found' });
        res.render('tasks/details.njk', { title: 'Task Details', task });
    } catch (error) {
        res.status(500).render('error.njk', { error });
    }
};

export const getUpdateTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;

    try {
        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) return res.status(404).render('error.njk', { message: 'Task not found' });
        res.render('tasks/edit.njk', { title: 'Edit Task', task });
    } catch (error) {
        res.status(500).render('error.njk', { error });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, dueDate } = req.body;
    const userId = req.session.user.id;

    try {
        await prisma.task.updateMany({
            where: { id, userId },
            data: {
                title,
                description,
                priority,
                status,
                dueDate: dueDate ? new Date(dueDate) : null
            }
        });
        res.redirect(`/tasks/${id}`);
    } catch (error) {
        res.render('tasks/edit.njk', { title: 'Edit Task', error: error.message, task: { id, ...req.body } });
    }
};

export const getDeleteConfirmation = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;

    try {
        const task = await prisma.task.findFirst({ where: { id, userId } });
        if (!task) return res.status(404).render('error.njk', { message: 'Task not found' });
        res.render('tasks/delete.njk', { title: 'Delete Task', task });
    } catch (error) {
        res.status(500).render('error.njk', { error });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.session.user.id;

    try {
        await prisma.task.deleteMany({ where: { id, userId } });
        res.redirect('/tasks');
    } catch (error) {
        res.status(500).render('error.njk', { error });
    }
};
