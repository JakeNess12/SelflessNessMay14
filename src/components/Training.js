import React, { useState } from 'react';
import './Training.css';

const Training = () => {
    const [activeSection, setActiveSection] = useState('volunteer');

    const trainingContent = {
        volunteer: {
            title: "Volunteer Training",
            sections: [
                {
                    title: "Getting Started",
                    content: `Learn the basics of volunteering with our organization. This section covers:
                    • Understanding our mission and values
                    • Basic safety protocols
                    • Communication guidelines
                    • Confidentiality requirements
                    • Emergency procedures`,
                    resources: [
                        {
                            title: "Improve Volunteer Training in 6 Steps",
                            type: "video",
                            url: "https://www.youtube.com/embed/6J05iKO2fdE",
                            description: "This video provides six key steps to improve volunteer training programs."
                        },
                        {
                            title: "Online Volunteer Training: Creating an Experience They Won't Forget!",
                            type: "video",
                            url: "https://www.youtube.com/embed/FeuYxZ_kBKg",
                            description: "Focuses on creating engaging online volunteer training experiences."
                        },
                        {
                            title: "Free Church Volunteer Training Resources",
                            type: "link",
                            url: "https://servehq.church/free/",
                            description: "Free training courses for small group leaders, greeters, and youth ministry volunteers."
                        }
                    ]
                },
                {
                    title: "Working with Vulnerable Populations",
                    content: `Essential guidelines for interacting with vulnerable individuals:
                    • Trauma-informed approach
                    • Cultural sensitivity
                    • De-escalation techniques
                    • Setting appropriate boundaries
                    • Recognizing signs of distress`,
                    resources: [
                        {
                            title: "How to Be a Trauma-Informed Volunteer",
                            type: "video",
                            url: "https://www.youtube.com/embed/FQ46ut9S1t0",
                            description: "Learn trauma-informed strategies for working with people in crisis."
                        },
                        {
                            title: "De-escalation Techniques for Volunteers",
                            type: "pdf",
                            url: "https://www.cdc.gov/violenceprevention/pdf/de-escalation-techniques.pdf",
                            description: "A CDC guide on de-escalation techniques for volunteers and professionals."
                        }
                    ]
                },
                {
                    title: "Resource Navigation",
                    content: `Learn how to effectively connect people with resources:
                    • Understanding available services
                    • Eligibility requirements
                    • Making appropriate referrals
                    • Following up on referrals
                    • Documentation procedures`,
                    resources: [
                        {
                            title: "Community Resource Navigation Training",
                            type: "pdf",
                            url: "https://www.chcs.org/media/Resource-Navigation-Guide.pdf",
                            description: "A guide on navigating and connecting people with community resources."
                        },
                        {
                            title: "How to Find and Refer People to Services",
                            type: "video",
                            url: "https://www.youtube.com/embed/4SRqFfHdfmo",
                            description: "Covers best practices in referring individuals to the right services."
                        }
                    ]
                }
            ]
        },
        bestPractices: {
            title: "Best Practices",
            sections: [
                {
                    title: "Communication Guidelines",
                    content: `Essential communication practices:
                    • Active listening techniques
                    • Non-judgmental approach
                    • Clear and simple language
                    • Cultural competency
                    • Empathy and understanding`,
                    resources: [
                        {
                            title: "How to Actively Listen as a Volunteer",
                            type: "video",
                            url: "https://www.youtube.com/embed/H78CRKmvqHk",
                            description: "Explains active listening techniques for volunteers."
                        },
                        {
                            title: "Cultural Competency in Volunteer Work",
                            type: "pdf",
                            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3085212/pdf/nihms-304837.pdf",
                            description: "Covers cultural awareness and sensitivity in volunteer interactions."
                        }
                    ]
                },
                {
                    title: "Safety Protocols",
                    content: `Important safety guidelines:
                    • Personal safety measures
                    • COVID-19 protocols
                    • Environmental awareness
                    • Emergency procedures
                    • Reporting incidents`,
                    resources: [
                        {
                            title: "Volunteer Safety: Personal & Community Safety",
                            type: "video",
                            url: "https://www.youtube.com/embed/FbNofELddWA",
                            description: "Provides personal safety tips for volunteers working in communities."
                        },
                        {
                            title: "OSHA Volunteer Safety Guidelines",
                            type: "pdf",
                            url: "https://www.osha.gov/sites/default/files/publications/volunteer-safety.pdf",
                            description: "Official guidelines on volunteer safety and workplace hazards."
                        }
                    ]
                },
                {
                    title: "Documentation Standards",
                    content: `Best practices for documentation:
                    • Required information
                    • Privacy considerations
                    • Record-keeping procedures
                    • Data protection
                    • Quality assurance`,
                    resources: [
                        {
                            title: "Data Privacy and Record-Keeping for Volunteers",
                            type: "pdf",
                            url: "https://www.privacy.org.au/Papers/Volunteers-Data-Protection-Guide.pdf",
                            description: "Guidelines on maintaining confidentiality and proper documentation."
                        },
                        {
                            title: "How to Maintain Accurate Records in Outreach Work",
                            type: "video",
                            url: "https://www.youtube.com/embed/1pLMs3XryU8",
                            description: "Explains best practices for volunteer record-keeping."
                        }
                    ]
                }
            ]
        },
        resources: {
            title: "Additional Resources",
            sections: [
                {
                    title: "Training Materials",
                    content: `Access to supplementary training resources:
                    • Training videos
                    • Downloadable guides
                    • Reference materials
                    • Practice scenarios
                    • Assessment tools`,
                    resources: [
                        {
                            title: "Bloomerang Volunteer Training Videos",
                            type: "playlist",
                            url: "https://www.youtube.com/playlist?list=PL7dRjlMunY3VDiOy4Kfn1qW9MZzJn6oaW",
                            description: "A collection of training videos for volunteers."
                        },
                        {
                            title: "Volunteer Training Guide",
                            type: "pdf",
                            url: "https://www.pointsoflight.org/resources/volunteer-management-guide.pdf",
                            description: "A structured guide for training and managing volunteers."
                        }
                    ]
                },
                {
                    title: "Support Network",
                    content: `Connect with other volunteers and staff:
                    • Mentorship opportunities
                    • Regular check-ins
                    • Group discussions
                    • Feedback sessions
                    • Professional development`,
                    resources: [
                        {
                            title: "How to Set Up a Volunteer Mentorship Program",
                            type: "link",
                            url: "https://www.nonprofithub.org/volunteer-mentorship-guide/",
                            description: "Explains how to create and maintain a mentorship system for volunteers."
                        },
                        {
                            title: "Peer Support for Volunteers",
                            type: "video",
                            url: "https://www.youtube.com/embed/9ht5FeNXk30",
                            description: "Shows how volunteers can support one another through mentorship and community groups."
                        }
                    ]
                },
                {
                    title: "Continuing Education",
                    content: `Opportunities for ongoing learning:
                    • Advanced training modules
                    • Specialized certifications
                    • Workshop schedules
                    • Online courses
                    • Professional development paths`,
                    resources: [
                        {
                            title: "Certified Volunteer Coordinator Training",
                            type: "link",
                            url: "https://www.volunteermatch.org/training/certification",
                            description: "Online certification for volunteer coordinators."
                        },
                        {
                            title: "Professional Development for Outreach Volunteers",
                            type: "video",
                            url: "https://www.youtube.com/embed/TAWxEO6gprE",
                            description: "Covers career and professional development for volunteers."
                        }
                    ]
                }
            ]
        }
    };

    return (
        <div className="training-container">
            <h1>Training & Best Practices</h1>
            
            <div className="section-toggle">
                <button 
                    className={`toggle-btn ${activeSection === 'volunteer' ? 'active' : ''}`}
                    onClick={() => setActiveSection('volunteer')}
                >
                    Volunteer Training
                </button>
                <button 
                    className={`toggle-btn ${activeSection === 'bestPractices' ? 'active' : ''}`}
                    onClick={() => setActiveSection('bestPractices')}
                >
                    Best Practices
                </button>
                <button 
                    className={`toggle-btn ${activeSection === 'resources' ? 'active' : ''}`}
                    onClick={() => setActiveSection('resources')}
                >
                    Resources
                </button>
            </div>

            <div className="content-section">
                <h2>{trainingContent[activeSection].title}</h2>
                
                <div className="training-grid">
                    {trainingContent[activeSection].sections.map((section, index) => (
                        <div key={index} className="training-card">
                            <h3>{section.title}</h3>
                            <div className="card-content">
                                {section.content.split('\n').map((line, i) => (
                                    <p key={i}>{line.trim()}</p>
                                ))}
                                {section.resources && (
                                    <div className="resource-list">
                                        <h4>Resources</h4>
                                        {section.resources.map((resource, rIndex) => (
                                            <div key={rIndex} className="resource-item">
                                                {resource.type === 'video' && (
                                                    <div className="video-container">
                                                        <iframe
                                                            src={resource.url}
                                                            title={resource.title}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                )}
                                                <h5>{resource.title}</h5>
                                                <p>{resource.description}</p>
                                                {(resource.type === 'pdf' || resource.type === 'link' || resource.type === 'playlist') && (
                                                    <a 
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="resource-link"
                                                    >
                                                        <i className={`fas fa-${resource.type === 'pdf' ? 'file-pdf' : 
                                                                      resource.type === 'playlist' ? 'play-circle' : 
                                                                      'external-link-alt'}`}></i>
                                                        {resource.type === 'pdf' ? 'Download PDF' :
                                                         resource.type === 'playlist' ? 'View Playlist' :
                                                         'Visit Website'}
                                                    </a>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="help-section">
                <h3>Need Help?</h3>
                <p>
                    If you need assistance with training or have questions about best practices,
                    please contact our volunteer coordinator at volunteer@outreach.org or call (555) 123-4567.
                </p>
            </div>
        </div>
    );
};

export default Training; 