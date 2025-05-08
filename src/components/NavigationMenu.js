import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useVolunteer } from '../context/VolunteerContext';
import './NavigationMenu.css';

const NavigationMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const { currentUser, logout } = useVolunteer();
    const location = useLocation();

    const navigation = [
        { name: 'Home', path: '/', icon: 'fas fa-home' },
        { name: 'Search for Help', path: '/find-help', icon: 'fas fa-search' },
        { name: 'Resources', path: '/resources', icon: 'fas fa-book' },
        { name: 'AI Chatbot', path: '/chat', icon: 'fas fa-robot' },
        { name: 'Training & Support', path: '/training', icon: 'fas fa-graduation-cap' },
        { name: 'Community', path: '/community', icon: 'fas fa-users' },
        { name: 'About Us', path: '/about', icon: 'fas fa-info-circle' }
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <div className="navigation-menu">
            <button className="hamburger-button" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
            </button>

            <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="menu-content" onClick={e => e.stopPropagation()}>
                    <div className="menu-header">
                        <h2>Menu</h2>
                        <button className="close-button" onClick={toggleMenu}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="theme-toggle">
                        <button onClick={toggleTheme} className="theme-button">
                            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                        </button>
                    </div>

                    <nav className="menu-nav">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
                                onClick={toggleMenu}
                            >
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </Link>
                        ))}
                        
                        {currentUser ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
                                    onClick={toggleMenu}
                                >
                                    <i className="fas fa-tachometer-alt"></i>
                                    <span>Dashboard</span>
                                </Link>
                                <button className="menu-item logout-button" onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className={`menu-item ${location.pathname === '/login' ? 'active' : ''}`}
                                    onClick={toggleMenu}
                                >
                                    <i className="fas fa-sign-in-alt"></i>
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className={`menu-item ${location.pathname === '/register' ? 'active' : ''}`}
                                    onClick={toggleMenu}
                                >
                                    <i className="fas fa-user-plus"></i>
                                    <span>Register</span>
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu; 