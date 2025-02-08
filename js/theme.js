export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeStylesheet = document.getElementById('theme-style');
        
        this.initializeEventListeners();
        this.loadSavedTheme();
    }

    initializeEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        const isDark = this.themeStylesheet.href.includes('dark');
        const newTheme = isDark ? 'light' : 'dark';
        this.themeStylesheet.href = `css/${newTheme}-theme.css`;
        localStorage.setItem('theme', newTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.themeStylesheet.href = `css/${savedTheme}-theme.css`;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();
