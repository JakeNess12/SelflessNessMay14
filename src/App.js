import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { VolunteerProvider } from './context/VolunteerContext';
import NavigationMenu from './components/NavigationMenu';
import Home from './components/Home';
import FindHelp from './components/FindHelp';
import ResourceChat from './components/ResourceChat';
import Training from './components/Training';
import Community from './components/Community';
import ResourcesList from './components/ResourcesList';
import About from './components/About';
import Contact from './components/Contact';
import VolunteerDashboard from './components/dashboard/VolunteerDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import 'leaflet/dist/leaflet.css';
import regionalServices from './regional_services.json';

// Import icons
import { FaHome, FaSearch, FaComments, FaGraduationCap, FaUsers, FaMapMarkedAlt, FaBookReader } from 'react-icons/fa';

function App() {
    return (
        <ThemeProvider>
            <VolunteerProvider>
                <div className="app-container">
                    <NavigationMenu />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/find-help" element={<FindHelp />} />
                            <Route path="/resources" element={<ResourcesList />} />
                            <Route path="/chat" element={<ResourceChat resources={regionalServices} />} />
                            <Route path="/training" element={<Training />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<VolunteerDashboard />} />
                        </Routes>
                    </main>
                </div>
            </VolunteerProvider>
        </ThemeProvider>
    );
}

export default App;
