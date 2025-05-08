import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteer } from '../../context/VolunteerContext';
import './VolunteerDashboard.css';

const VolunteerDashboard = () => {
    const { currentUser, getOrganization, getAssignments, getTrainingProgress, getReports } = useVolunteer();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [organization, setOrganization] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [trainingProgress, setTrainingProgress] = useState([]);
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const loadDashboardData = async () => {
            try {
                const [org, assigns, progress, reportData] = await Promise.all([
                    getOrganization(currentUser.organizationId),
                    getAssignments(currentUser.id),
                    getTrainingProgress(currentUser.id),
                    getReports(currentUser.id)
                ]);

                setOrganization(org);
                setAssignments(assigns);
                setTrainingProgress(progress);
                setReports(reportData);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, [currentUser, navigate, getOrganization, getAssignments, getTrainingProgress, getReports]);

    if (isLoading) {
        return <div className="dashboard-loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {currentUser.name}</h1>
                <div className="organization-info">
                    <h2>{organization?.name}</h2>
                    <p>{organization?.contactInfo}</p>
                </div>
            </div>

            <div className="dashboard-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'training' ? 'active' : ''}`}
                    onClick={() => setActiveTab('training')}
                >
                    Training
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'assignments' ? 'active' : ''}`}
                    onClick={() => setActiveTab('assignments')}
                >
                    Assignments
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reports')}
                >
                    Reports
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab === 'overview' && (
                    <div className="overview-grid">
                        <div className="overview-card">
                            <h3>Training Progress</h3>
                            <div className="progress-stats">
                                <div className="stat">
                                    <span className="stat-value">
                                        {trainingProgress.filter(p => p.status === 'completed').length}
                                    </span>
                                    <span className="stat-label">Completed Modules</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">
                                        {trainingProgress.filter(p => p.status === 'in_progress').length}
                                    </span>
                                    <span className="stat-label">In Progress</span>
                                </div>
                            </div>
                        </div>

                        <div className="overview-card">
                            <h3>Current Assignments</h3>
                            <div className="assignment-list">
                                {assignments.slice(0, 3).map(assignment => (
                                    <div key={assignment.id} className="assignment-item">
                                        <h4>{assignment.title}</h4>
                                        <p>{assignment.location}</p>
                                        <span className="assignment-date">{assignment.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="overview-card">
                            <h3>Recent Reports</h3>
                            <div className="report-list">
                                {reports.slice(0, 3).map(report => (
                                    <div key={report.id} className="report-item">
                                        <h4>{report.title}</h4>
                                        <p>{report.summary}</p>
                                        <span className="report-date">{report.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'training' && (
                    <div className="training-section">
                        <h2>Training Modules</h2>
                        <div className="training-grid">
                            {trainingProgress.map(module => (
                                <div key={module.id} className="training-card">
                                    <h3>{module.title}</h3>
                                    <p>{module.description}</p>
                                    <div className="module-status">
                                        <span className={`status-badge ${module.status}`}>
                                            {module.status}
                                        </span>
                                        <button className="module-btn">
                                            {module.status === 'completed' ? 'Review' : 'Continue'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'assignments' && (
                    <div className="assignments-section">
                        <h2>Your Assignments</h2>
                        <div className="assignments-grid">
                            {assignments.map(assignment => (
                                <div key={assignment.id} className="assignment-card">
                                    <h3>{assignment.title}</h3>
                                    <p>{assignment.description}</p>
                                    <div className="assignment-details">
                                        <span className="location">
                                            <i className="fas fa-map-marker-alt"></i>
                                            {assignment.location}
                                        </span>
                                        <span className="date">
                                            <i className="fas fa-calendar"></i>
                                            {assignment.date}
                                        </span>
                                    </div>
                                    <button className="assignment-btn">View Details</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="reports-section">
                        <h2>Your Reports</h2>
                        <button className="new-report-btn">
                            <i className="fas fa-plus"></i>
                            New Report
                        </button>
                        <div className="reports-grid">
                            {reports.map(report => (
                                <div key={report.id} className="report-card">
                                    <h3>{report.title}</h3>
                                    <p>{report.summary}</p>
                                    <div className="report-details">
                                        <span className="date">
                                            <i className="fas fa-calendar"></i>
                                            {report.date}
                                        </span>
                                        <span className="status">
                                            <i className="fas fa-check-circle"></i>
                                            {report.status}
                                        </span>
                                    </div>
                                    <button className="report-btn">View Full Report</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolunteerDashboard; 