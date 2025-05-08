import React, { createContext, useContext, useState, useEffect } from 'react';
import { openDB } from 'idb';

const VolunteerContext = createContext();

// Initialize IndexedDB
const initDB = async () => {
    const db = await openDB('volunteerDB', 1, {
        upgrade(db) {
            // Users store
            if (!db.objectStoreNames.contains('users')) {
                const userStore = db.createObjectStore('users', { keyPath: 'id' });
                userStore.createIndex('email', 'email', { unique: true });
                userStore.createIndex('organizationId', 'organizationId');
            }

            // Organizations store
            if (!db.objectStoreNames.contains('organizations')) {
                const orgStore = db.createObjectStore('organizations', { keyPath: 'id' });
                orgStore.createIndex('name', 'name');
            }

            // Assignments store
            if (!db.objectStoreNames.contains('assignments')) {
                const assignmentStore = db.createObjectStore('assignments', { keyPath: 'id' });
                assignmentStore.createIndex('userId', 'userId');
                assignmentStore.createIndex('organizationId', 'organizationId');
            }

            // Training progress store
            if (!db.objectStoreNames.contains('trainingProgress')) {
                const trainingStore = db.createObjectStore('trainingProgress', { keyPath: 'id' });
                trainingStore.createIndex('userId', 'userId');
            }

            // Reports store
            if (!db.objectStoreNames.contains('reports')) {
                const reportStore = db.createObjectStore('reports', { keyPath: 'id' });
                reportStore.createIndex('userId', 'userId');
                reportStore.createIndex('organizationId', 'organizationId');
            }
        },
    });
    return db;
};

export const VolunteerProvider = ({ children }) => {
    const [db, setDB] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const setupDB = async () => {
            const database = await initDB();
            setDB(database);
            
            // Check for existing session
            const session = localStorage.getItem('volunteerSession');
            if (session) {
                const { userId } = JSON.parse(session);
                const user = await database.get('users', userId);
                if (user) {
                    setCurrentUser(user);
                }
            }
            setIsLoading(false);
        };
        setupDB();
    }, []);

    const login = async (email, password) => {
        const user = await db.getFromIndex('users', 'email', email);
        if (user && user.password === password) {
            setCurrentUser(user);
            localStorage.setItem('volunteerSession', JSON.stringify({ userId: user.id }));
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('volunteerSession');
    };

    const register = async (userData) => {
        const id = Date.now().toString();
        const newUser = {
            id,
            ...userData,
            createdAt: new Date().toISOString(),
        };
        await db.add('users', newUser);
        return newUser;
    };

    const getOrganization = async (organizationId) => {
        return await db.get('organizations', organizationId);
    };

    const getAssignments = async (userId) => {
        return await db.getAllFromIndex('assignments', 'userId', userId);
    };

    const getTrainingProgress = async (userId) => {
        return await db.getAllFromIndex('trainingProgress', 'userId', userId);
    };

    const getReports = async (userId) => {
        return await db.getAllFromIndex('reports', 'userId', userId);
    };

    const submitReport = async (reportData) => {
        const id = Date.now().toString();
        const newReport = {
            id,
            ...reportData,
            createdAt: new Date().toISOString(),
        };
        await db.add('reports', newReport);
        return newReport;
    };

    const updateTrainingProgress = async (progressData) => {
        const id = Date.now().toString();
        const newProgress = {
            id,
            ...progressData,
            updatedAt: new Date().toISOString(),
        };
        await db.add('trainingProgress', newProgress);
        return newProgress;
    };

    const value = {
        currentUser,
        isLoading,
        login,
        logout,
        register,
        getOrganization,
        getAssignments,
        getTrainingProgress,
        getReports,
        submitReport,
        updateTrainingProgress,
    };

    return (
        <VolunteerContext.Provider value={value}>
            {!isLoading && children}
        </VolunteerContext.Provider>
    );
};

export const useVolunteer = () => {
    const context = useContext(VolunteerContext);
    if (!context) {
        throw new Error('useVolunteer must be used within a VolunteerProvider');
    }
    return context;
}; 