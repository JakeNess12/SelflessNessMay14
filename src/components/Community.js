import React, { useState } from 'react';
import './Community.css';

const Community = () => {
    const [activeTab, setActiveTab] = useState('updates');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'update',
        contact: '',
        anonymous: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({
            title: '',
            description: '',
            type: 'update',
            contact: '',
            anonymous: false
        });
        alert('Thank you for your submission! Our team will review it shortly.');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Sample success stories and updates
    const communityContent = {
        updates: [
            {
                title: "New Shelter Opening in Downtown",
                date: "2024-03-15",
                description: "A new emergency shelter with 50 beds will be opening next month...",
                type: "update"
            },
            {
                title: "Food Bank Hours Extended",
                date: "2024-03-10",
                description: "Local food bank now operating extended hours on weekends...",
                type: "update"
            }
        ],
        success: [
            {
                title: "Family Finds Permanent Housing",
                date: "2024-03-12",
                description: "After 6 months of support, the Johnson family has successfully...",
                type: "success"
            },
            {
                title: "Job Training Program Graduate",
                date: "2024-03-08",
                description: "Mark completed our job training program and secured full-time employment...",
                type: "success"
            }
        ],
        feedback: [
            {
                title: "Resource Navigation Improvement",
                date: "2024-03-14",
                description: "Community members have reported improved ease of finding resources...",
                type: "feedback"
            },
            {
                title: "Mobile Services Appreciation",
                date: "2024-03-09",
                description: "Positive feedback received about our new mobile service units...",
                type: "feedback"
            }
        ]
    };

    return (
        <div className="community-container">
            <h1>Community Engagement</h1>
            
            <div className="tab-navigation">
                <button 
                    className={`tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('updates')}
                >
                    Updates & Issues
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'success' ? 'active' : ''}`}
                    onClick={() => setActiveTab('success')}
                >
                    Success Stories
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
                    onClick={() => setActiveTab('feedback')}
                >
                    Community Feedback
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'submit' ? 'active' : ''}`}
                    onClick={() => setActiveTab('submit')}
                >
                    Submit Report
                </button>
            </div>

            {activeTab !== 'submit' ? (
                <div className="content-grid">
                    {communityContent[activeTab].map((item, index) => (
                        <div key={index} className="content-card">
                            <div className="card-header">
                                <h3>{item.title}</h3>
                                <span className="date">{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                            <p>{item.description}</p>
                            <div className="card-footer">
                                <button className="action-btn">Read More</button>
                                {item.type === 'success' && (
                                    <button className="action-btn share">Share Story</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="submission-form">
                    <h2>Submit a Report</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="type">Type of Report</label>
                            <select 
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="update">Resource Update</option>
                                <option value="issue">Report Issue</option>
                                <option value="success">Success Story</option>
                                <option value="feedback">General Feedback</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Brief title for your report"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                placeholder="Provide detailed information..."
                                rows="5"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact">Contact Information (Optional)</label>
                            <input
                                type="text"
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                placeholder="Email or phone number for follow-up"
                            />
                        </div>

                        <div className="form-group checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name="anonymous"
                                    checked={formData.anonymous}
                                    onChange={handleInputChange}
                                />
                                Submit Anonymously
                            </label>
                        </div>

                        <button type="submit" className="submit-btn">
                            Submit Report
                        </button>
                    </form>
                </div>
            )}

            <div className="community-footer">
                <h3>Get Involved</h3>
                <p>
                    Your participation helps us improve our services and better serve the community.
                    Share your experiences, report issues, or celebrate successes - every voice matters.
                </p>
                <div className="contact-info">
                    <p>Questions? Contact us at community@outreach.org</p>
                    <p>Emergency? Call (555) 123-4567</p>
                </div>
            </div>
        </div>
    );
};

export default Community; 