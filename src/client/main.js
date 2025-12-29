import './style.css';
import { createIcons, CheckCircle, Clock, List, Plus, Trash, Edit, ChevronRight, LogOut, User, LayoutDashboard, Calendar, AlertTriangle, Moon, Sun } from 'lucide';

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    createIcons({
        icons: {
            CheckCircle,
            Clock,
            List,
            Plus,
            Trash,
            Edit,
            ChevronRight,
            LogOut,
            User,
            LayoutDashboard,
            Calendar,
            AlertTriangle,
            Moon,
            Sun
        }
    });

    // Dark mode toggle logic
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // Set initial theme
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});
