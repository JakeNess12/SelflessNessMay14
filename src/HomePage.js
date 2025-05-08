import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css"; // Ensure this path is correct

function HomePage() {
  return (
    <div className="homepage-container" style={{ padding: '20px' }}>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Selfless-Ness</h1>
          <p>If you are experiencing an emergency, <strong>CALL 911</strong>.</p>
          <div className="download-buttons">
            <a href="https://www.apple.com/app-store/" className="app-button">Download on the App Store</a>
            <a href="https://play.google.com/store/apps" className="app-button">Get it on Google Play</a>
          </div>
          <Link to="/resources" className="cta-button">Access Resources</Link>
        </div>
      </header>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>At Selfless-Ness, we make it easier for everyday people to help those experiencing homelessness. 
           Our app provides volunteers with the tools and training they need to make a meaningful impact.</p>
      </section>

      {/* Featured Story */}
      <section className="featured">
        <h2>Featured Story</h2>
        <p>We partnered with <strong>Brooklake Church</strong> and <strong>FUSION</strong> to help renovate a local condo for families transitioning out of homelessness.</p>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <h2>Homelessness in Our Community</h2>
        <p>First-time homelessness in Pierce County surged to nearly <strong>4,800 people in 2023</strong>.</p>
        <p>Tacoma/Lakewood/Pierce County ranks <strong>8th nationwide</strong> for suburban homelessness.</p>
      </section>

      {/* Navigation Links */}
      <footer className="footer">
        <Link to="/about">About Us</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/get-involved">Get Involved</Link>
      </footer>
    </div>
  );
}

export default HomePage;
