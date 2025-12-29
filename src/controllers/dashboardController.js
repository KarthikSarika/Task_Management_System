import prisma from '../db.js';

export const getDashboard = async (req, res) => {
    const userId = req.session.user.id;

    try {
        const [totalTasks, completedTasks, pendingTasks, todayTasks] = await Promise.all([
            prisma.task.count({ where: { userId } }),
            prisma.task.count({ where: { userId, status: 'COMPLETED' } }),
            prisma.task.count({ where: { userId, status: 'PENDING' } }),
            prisma.task.findMany({
                where: {
                    userId,
                    dueDate: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lte: new Date(new Date().setHours(23, 59, 59, 999))
                    }
                },
                take: 5,
                orderBy: { priority: 'desc' }
            })
        ]);

        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        res.render('dashboard.njk', {
            title: 'Dashboard',
            stats: { totalTasks, completedTasks, pendingTasks, progress },
            todayTasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).render('error.njk', { error });
    }
};
