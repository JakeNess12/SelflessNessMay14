import React, { useState } from 'react';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        alert('Thank you for your message. We will get back to you soon!');
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            
            <div className="contact-content">
                <section className="contact-info">
                    <h2>Get in Touch</h2>
                    <p>
                        Have questions about our services or need assistance? 
                        We're here to help! Fill out the form or reach out to us 
                        directly using the contact information below.
                    </p>
                    
                    <div className="contact-details">
                        <div className="contact-item">
                            <strong>Email:</strong>
                            <a href="mailto:support@outreachapp.com">support@outreachapp.com</a>
                        </div>
                        <div className="contact-item">
                            <strong>Phone:</strong>
                            <a href="tel:+1-555-123-4567">+1 (555) 123-4567</a>
                        </div>
                        <div className="contact-item">
                            <strong>Hours:</strong>
                            <span>Monday - Friday: 9:00 AM - 5:00 PM PST</span>
                        </div>
                    </div>
                </section>

                <section className="contact-form">
                    <h2>Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Contact; 