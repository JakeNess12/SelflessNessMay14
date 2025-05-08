import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <h1>About Our Outreach App</h1>
            
            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    We are dedicated to connecting individuals with essential community resources 
                    and services. Our platform makes it easier for people to find and access the 
                    help they need, when they need it.
                </p>
            </section>

            <section className="about-section">
                <h2>What We Offer</h2>
                <ul>
                    <li>
                        <strong>Interactive Map:</strong> Find nearby resources and services with 
                        our easy-to-use map interface
                    </li>
                    <li>
                        <strong>Resource Directory:</strong> Browse our comprehensive list of 
                        community services and programs
                    </li>
                    <li>
                        <strong>Resource Chat:</strong> Get personalized assistance in finding 
                        the right resources for your needs
                    </li>
                    <li>
                        <strong>Training Resources:</strong> Access educational materials and 
                        training opportunities
                    </li>
                    <li>
                        <strong>Community Support:</strong> Connect with others and share 
                        experiences in our community section
                    </li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Our Commitment</h2>
                <p>
                    We are committed to maintaining an up-to-date, comprehensive database of 
                    resources and ensuring that our platform remains accessible to all members 
                    of our community. We work closely with local organizations and service 
                    providers to provide accurate, reliable information.
                </p>
            </section>
        </div>
    );
}

export default About; 