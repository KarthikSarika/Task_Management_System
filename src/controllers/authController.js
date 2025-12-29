import bcrypt from 'bcrypt';
import prisma from '../db.js';

export const registerPage = (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('auth/register.njk', { title: 'Register' });
};

export const loginPage = (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('auth/login.njk', { title: 'Login' });
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.render('auth/register.njk', {
                title: 'Register',
                error: 'Email already in use',
                values: { name, email }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect('/dashboard');
    } catch (error) {
        res.render('auth/register.njk', {
            title: 'Register',
            error: 'An error occurred during registration',
            values: { name, email }
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('auth/login.njk', {
                title: 'Login',
                error: 'Invalid email or password',
                values: { email }
            });
        }

        req.session.user = { id: user.id, name: user.name, email: user.email };
        res.redirect('/dashboard');
    } catch (error) {
        res.render('auth/login.njk', {
            title: 'Login',
            error: 'An error occurred during login',
            values: { email }
        });
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};
