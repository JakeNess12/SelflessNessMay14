import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const EmergencyModal = ({ type, onClose }) => {
    const emergencyInfo = {
        'mental-health': {
            title: 'Mental Health Crisis Support',
            description: '24/7 confidential support for mental health crises',
            phone: '1-800-273-8255',
            website: 'https://suicidepreventionlifeline.org',
            additionalInfo: 'Available 24/7, 365 days a year. All calls are confidential.'
        },
        'domestic-violence': {
            title: 'Domestic Violence Hotline',
            description: 'Confidential support for domestic violence situations',
            phone: '1-800-799-7233',
            website: 'https://www.thehotline.org',
            additionalInfo: 'Available 24/7. All calls are confidential and free.'
        },
        'emergency': {
            title: 'Emergency Services',
            description: 'For immediate emergency assistance',
            phone: '911',
            website: null,
            additionalInfo: 'Call 911 for immediate emergency assistance.'
        },
        'substance-abuse': {
            title: 'Substance Abuse Support',
            description: '24/7 support for substance abuse and addiction',
            phone: '1-800-662-4357',
            website: 'https://www.samhsa.gov/find-help/national-helpline',
            additionalInfo: 'Confidential support available 24/7. Free and confidential.'
        }
    };

    const info = emergencyInfo[type];

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{info.title}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <p>{info.description}</p>
                    <div className="emergency-info">
                        <div className="phone-number">
                            <i className="fas fa-phone"></i>
                            <span>{info.phone}</span>
                        </div>
                        {info.website && (
                            <div className="website">
                                <i className="fas fa-globe"></i>
                                <a href={info.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                </a>
                            </div>
                        )}
                        <p className="additional-info">{info.additionalInfo}</p>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={() => window.location.href = `tel:${info.phone}`}>
                        <i className="fas fa-phone"></i> Call Now
                    </button>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const [showTutorial, setShowTutorial] = useState(() => {
        const dontShow = localStorage.getItem('dontShowTutorial');
        return !dontShow;
    });
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [activeModal, setActiveModal] = useState(null);

    const handleCloseTutorial = () => {
        if (dontShowAgain) {
            localStorage.setItem('dontShowTutorial', 'true');
        }
        setShowTutorial(false);
    };

    const handleEmergencyClick = (type) => {
        setActiveModal(type);
    };

    return (
        <div className="home-container">
            {showTutorial && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Welcome to Selfless-Ness</h2>
                            <button className="modal-close" onClick={handleCloseTutorial}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Let's get you started with finding the help you need:</p>
                            <ul>
                                <li>Use the menu in the top-right to navigate between features</li>
                                <li>Access emergency services quickly from the Emergency Quick Access section</li>
                                <li>Find local resources using the map or search function</li>
                                <li>Get personalized guidance from our AI chatbot</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <label className="dont-show-again">
                                <input
                                    type="checkbox"
                                    checked={dontShowAgain}
                                    onChange={(e) => setDontShowAgain(e.target.checked)}
                                />
                                Don't show this again
                            </label>
                            <button onClick={handleCloseTutorial}>Get Started</button>
                        </div>
                    </div>
                </div>
            )}

            {activeModal && (
                <EmergencyModal
                    type={activeModal}
                    onClose={() => setActiveModal(null)}
                />
            )}

            <div className="home-header">
                <h1>Selfless-Ness</h1>
                <p>Helping volunteers and individuals in need connect with the right resources, fast.</p>
            </div>

            <section className="emergency-section">
                <h2>Emergency Quick Access</h2>
                <div className="emergency-buttons">
                    <button
                        className="emergency-button mental-health"
                        onClick={() => handleEmergencyClick('mental-health')}
                    >
                        <i className="fas fa-brain"></i>
                        Mental Health
                    </button>
                    <button
                        className="emergency-button domestic-violence"
                        onClick={() => handleEmergencyClick('domestic-violence')}
                    >
                        <i className="fas fa-shield-alt"></i>
                        Domestic Violence
                    </button>
                    <button
                        className="emergency-button emergency"
                        onClick={() => handleEmergencyClick('emergency')}
                    >
                        <i className="fas fa-ambulance"></i>
                        911 Emergency
                    </button>
                    <button
                        className="emergency-button substance-abuse"
                        onClick={() => handleEmergencyClick('substance-abuse')}
                    >
                        <i className="fas fa-hand-holding-heart"></i>
                        Substance Abuse
                    </button>
                </div>
            </section>

            {/* Main Actions - Compact hero section */}
            <section className="main-actions">
                <div className="action-buttons">
                    <Link to="/find-help" className="action-button primary">
                        <i className="fas fa-map-marked-alt"></i>
                        Find Help on Map
                    </Link>
                    <Link to="/chat" className="action-button secondary">
                        <i className="fas fa-robot"></i>
                        Talk to AI Assistant
                    </Link>
                </div>
            </section>

            {/* Quick Features - Grid of essential features */}
            <section className="quick-features">
                <div className="features-grid">
                    <Link to="/resources" className="feature-card">
                        <i className="fas fa-book"></i>
                        <h3>Resource Library</h3>
                    </Link>
                    <Link to="/training" className="feature-card">
                        <i className="fas fa-graduation-cap"></i>
                        <h3>Training & Support</h3>
                    </Link>
                    <Link to="/community" className="feature-card">
                        <i className="fas fa-users"></i>
                        <h3>Community</h3>
                    </Link>
                    <Link to="/about" className="feature-card">
                        <i className="fas fa-info-circle"></i>
                        <h3>About Us</h3>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home; 

