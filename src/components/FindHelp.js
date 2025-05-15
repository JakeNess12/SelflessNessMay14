import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './FindHelp.css';
import { FaLocationArrow, FaFilter } from 'react-icons/fa';

// Fix Leaflet default icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { resourceList } from '../Resources';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Default center (Seattle area)
const DEFAULT_CENTER = [47.6062, -122.3321];

// Custom icons for different categories
const resourceIcons = {
    Food: L.divIcon({
        className: 'custom-resource-marker',
        html: '<div class="resource-marker-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg></div>',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    }),
    Shelter: L.divIcon({
        className: 'custom-resource-marker',
        html: '<div class="resource-marker-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3498db"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    }),
    Health: L.divIcon({
        className: 'custom-resource-marker',
        html: '<div class="resource-marker-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2ecc71"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg></div>',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    }),
    User: L.divIcon({
        className: 'custom-resource-marker',
        html: '<div class="resource-marker-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f1c40f"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    })
};

// Component to handle map view changes
function ChangeView({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
}

// Legend component
function MapLegend() {
    return (
        <div className="map-legend">
            <h4>Resources</h4>
            <div className="legend-item">
                <div className="legend-color">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e74c3c">
                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                    </svg>
                </div>
                <span>Food</span>
            </div>
            <div className="legend-item">
                <div className="legend-color">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3498db">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                </div>
                <span>Shelter</span>
            </div>
            <div className="legend-item">
                <div className="legend-color">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2ecc71">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                </div>
                <span>Health</span>
            </div>
            <div className="legend-item">
                <div className="legend-color">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f1c40f">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                </div>
                <span>Your Location</span>
            </div>
        </div>
    );
}

export default function FindHelp() {
    const [userLocation, setUserLocation] = useState(DEFAULT_CENTER);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [locationError, setLocationError] = useState(null);
    const mapRef = useRef(null);

    const requestLocation = () => {
        setIsLoading(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError({
                message: 'Geolocation is not supported by your browser',
                action: 'Please try using a different browser that supports location services.',
                code: 'NOT_SUPPORTED'
            });
            setIsLoading(false);
            return;
        }

        const successHandler = (position) => {
            console.log('Location success:', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            });
            setUserLocation([position.coords.latitude, position.coords.longitude]);
            setIsLoading(false);
        };

        const errorHandler = (error) => {
            console.error('Geolocation error:', error);
            let errorMessage = '';
            let actionMessage = '';
            
            switch (error.code) {
                case 1: // PERMISSION_DENIED
                    errorMessage = 'Location access is required to show nearby resources.';
                    actionMessage = 'Please allow location access in your browser settings.';
                    break;
                case 2: // POSITION_UNAVAILABLE
                    errorMessage = 'Location information is unavailable.';
                    actionMessage = 'Please check your device settings and try again.';
                    break;
                case 3: // TIMEOUT
                    errorMessage = 'Location request timed out.';
                    actionMessage = 'Please check your internet connection and try again.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred.';
                    actionMessage = 'Please try again.';
            }
            setLocationError({
                message: errorMessage,
                action: actionMessage,
                code: error.code
            });
            setIsLoading(false);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        try {
            navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
        } catch (error) {
            setLocationError({
                message: 'Failed to request location access',
                action: 'Please try again.',
                code: 'REQUEST_FAILED'
            });
            setIsLoading(false);
        }
    };

    // Request location when component mounts
    useEffect(() => {
        requestLocation();
    }, []);

    const handleRetryLocation = () => {
        requestLocation();
    };

    const handleCenterLocation = () => {
        if (mapRef.current) {
            mapRef.current.setView(userLocation, 13);
        }
    };

    const filteredResources = selectedCategory === 'all' 
        ? resourceList 
        : resourceList.filter(resource => resource.category === selectedCategory);

    if (isLoading) {
        return <div className="loading">Loading map...</div>;
    }

    return (
        <div className="find-help-container">
            <div className="map-controls">
                <button 
                    className="center-location-btn"
                    onClick={handleCenterLocation}
                    title="Center on my location"
                >
                    <i className="fas fa-location-arrow"></i>
                </button>
                <button 
                    className={`filter-btn ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle filters"
                >
                    <i className="fas fa-filter"></i>
                </button>
            </div>

            {showFilters && (
                <div className="filter-panel">
                    <div className="filter-header">
                        <h4>Filter Resources</h4>
                        <button 
                            className="close-filter-btn"
                            onClick={() => setShowFilters(false)}
                            title="Close filters"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <select 
                        className="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Shelter">Shelter</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
            )}

            <div className="map-wrapper">
                <MapContainer
                    center={userLocation}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                    ref={mapRef}
                >
                    <ChangeView center={userLocation} zoom={13} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    {/* User location marker */}
                    <Marker position={userLocation} icon={resourceIcons.User}>
                        <Popup>Your location</Popup>
                    </Marker>

                    {/* Resource markers */}
                    {filteredResources.map((resource, index) => (
                        <Marker
                            key={index}
                            position={[resource.lat, resource.lon]}
                            icon={resourceIcons[resource.category]}
                        >
                            <Popup className="resource-popup">
                                <h3>{resource.name}</h3>
                                <p><strong>Category:</strong> {resource.category}</p>
                                <p><strong>Address:</strong> {resource.address}</p>
                                <p><strong>Phone:</strong> {resource.phone}</p>
                                <div className="popup-buttons">
                                    <a 
                                        href={resource.website} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="website-link"
                                    >
                                        Visit Website
                                    </a>
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lon}&travelmode=driving`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="directions-link"
                                    >
                                        <span className="icon">🚗</span> Get Directions
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
                <MapLegend />
            </div>
            {locationError && (
                <div className="location-error">
                    <div className="error-content">
                        <div className="error-message">
                            <p>{locationError.message}</p>
                            <p className="action-message">{locationError.action}</p>
                        </div>
                        <button 
                            className="retry-button"
                            onClick={handleRetryLocation}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 