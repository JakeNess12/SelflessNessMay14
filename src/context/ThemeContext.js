import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    light: {
        background: '#EEF2F7',
        surface: '#FFFFFF',
        primary: '#1976D2',
        textPrimary: '#1A1A1A',
        textSecondary: '#424242',
        cardBackground: '#FFFFFF',
        navBackground: '#1976D2',
        buttonPrimary: '#1976D2',
        buttonSecondary: '#2196F3',
        accentLight: '#BBDEFB',
        accentDark: '#1565C0',
        error: '#D32F2F',
        success: '#2E7D32',
        warning: '#ED6C02'
    },
    dark: {
        background: '#121212',
        surface: '#1E1E1E',
        primary: '#90CAF9',
        textPrimary: '#FFFFFF',
        textSecondary: '#B0B0B0',
        cardBackground: '#1E1E1E',
        navBackground: '#1E1E1E',
        buttonPrimary: '#90CAF9',
        buttonSecondary: '#64B5F6',
        accentLight: '#1E88E5',
        accentDark: '#0D47A1',
        error: '#EF5350',
        success: '#66BB6A',
        warning: '#FFA726'
    }
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    const theme = isDarkMode ? themes.dark : themes.light;

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        
        // Apply theme variables
        document.documentElement.style.setProperty('--background', theme.background);
        document.documentElement.style.setProperty('--surface', theme.surface);
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--text-primary', theme.textPrimary);
        document.documentElement.style.setProperty('--text-secondary', theme.textSecondary);
        document.documentElement.style.setProperty('--card-background', theme.cardBackground);
        document.documentElement.style.setProperty('--nav-background', theme.navBackground);
        document.documentElement.style.setProperty('--button-primary', theme.buttonPrimary);
        document.documentElement.style.setProperty('--button-secondary', theme.buttonSecondary);
        document.documentElement.style.setProperty('--accent-light', theme.accentLight);
        document.documentElement.style.setProperty('--accent-dark', theme.accentDark);
        document.documentElement.style.setProperty('--error', theme.error);
        document.documentElement.style.setProperty('--success', theme.success);
        document.documentElement.style.setProperty('--warning', theme.warning);
    }, [isDarkMode, theme]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 