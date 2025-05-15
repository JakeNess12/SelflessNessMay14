import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Joyride, { STATUS } from 'react-joyride';
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
    const [showTutorial, setShowTutorial] = useState(true);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [runTour, setRunTour] = useState(false);

    useEffect(() => {
        const dontShow = localStorage.getItem('dontShowTutorial');
        console.log('LocalStorage value:', dontShow); // Debug log
        if (dontShow === 'true') {
            setShowTutorial(false);
        }
    }, []);

    const steps = [
        {
            target: '.emergency-section',
            content: 'Quick access to emergency services and support. Click any button for immediate assistance.',
            placement: 'bottom',
            disableBeacon: true
        },
        {
            target: '.action-button.primary',
            content: 'Find nearby resources and services on our interactive map.',
            placement: 'bottom'
        },
        {
            target: '.action-button.secondary',
            content: 'Chat with our AI Assistant for personalized guidance and support.',
            placement: 'bottom'
        },
        {
            target: '.features-grid',
            content: 'Access our resource library, training materials, community features, and learn more about our mission.',
            placement: 'top'
        }
    ];

    const handleCloseTutorial = () => {
        if (dontShowAgain) {
            localStorage.setItem('dontShowTutorial', 'true');
        }
        setShowTutorial(false);
        setRunTour(true);
    };

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTour(false);
        }
    };

    const handleEmergencyClick = (type) => {
        setActiveModal(type);
    };

    return (
        <div className="home-container">
            <Joyride
                steps={steps}
                run={runTour}
                continuous
                showProgress
                showSkipButton
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        primaryColor: '#1a73e8',
                        zIndex: 1000,
                    },
                    tooltip: {
                        fontSize: '1rem',
                        padding: '1rem',
                    },
                    buttonNext: {
                        backgroundColor: '#1a73e8',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                    },
                    buttonBack: {
                        color: '#1a73e8',
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                    },
                    buttonSkip: {
                        color: '#666',
                        fontSize: '0.9rem',
                    }
                }}
            />

            {showTutorial && (
                <div className="modal" style={{ display: 'flex' }}>
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
                                <li>Use the Emergency Quick Access buttons for immediate assistance</li>
                                <li>Find Help on Map to locate nearby services and support</li>
                                <li>Talk to our AI Assistant for personalized guidance</li>
                                <li>Access the Resource Library for comprehensive information</li>
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

