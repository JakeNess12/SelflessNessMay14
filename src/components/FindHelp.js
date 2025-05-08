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

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom icons for different categories
const resourceIcons = {
    Food: L.divIcon({
        className: 'custom-resource-marker food-marker',
        html: '<div class="resource-marker-icon" style="background-color: #e74c3c;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M416 32H96c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32zM256 448c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm0-96c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"/></svg></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    }),
    Shelter: L.divIcon({
        className: 'custom-resource-marker shelter-marker',
        html: '<div class="resource-marker-icon" style="background-color: #3498db;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="white" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H352c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    }),
    Health: L.divIcon({
        className: 'custom-resource-marker health-marker',
        html: '<div class="resource-marker-icon" style="background-color: #2ecc71;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="white" d="M256 0C390.4 0 480 35.2 480 80V96l0 32c0 35.3-28.7 64-64 64H352c-35.3 0-64-28.7-64-64V96 80c0-44.8 89.6-80 224-80zM96 80V96v64c0 35.3-28.7 64-64 64H32c-35.3 0-64-28.7-64-64V96 80C0 35.2 89.6 0 224 0S448 35.2 448 80v64c0 35.3-28.7 64-64 64H352c-35.3 0-64-28.7-64-64V80c0-44.8-89.6-80-224-80S0 35.2 0 80zM64 416V352h64V416H64zm288 0V352h64v64H352zM64 480V416h64v64H64zm288 0V416h64v64H352zM64 224V160h64v64H64zm288 0V160h64v64H352zM64 288V224h64v64H64zm288 0V224h64v64H352zM64 352V288h64v64H64zm288 0V288h64v64H352z"/></svg></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    }),
    User: L.divIcon({
        className: 'custom-resource-marker user-marker',
        html: '<div class="resource-marker-icon" style="background-color: #f1c40f;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="white" d="M215.7 499.2C267 435 288 373.7 288 320C288 266.3 267 205 215.7 140.8C410.3 96.2 512 41.4 512 0C512 0 410.3 0 192 0C-26.3 0 -128 0 -128 0C-128 41.4 -26.3 96.2 168.3 140.8C117 205 96 266.3 96 320C96 373.7 117 435 168.3 499.2C-26.3 544.2 -128 598.6 -128 640C-128 640 -26.3 640 192 640C410.3 640 512 640 512 640C512 598.6 410.3 544.2 215.7 499.2z"/></svg></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
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
                <div className="legend-color food-marker">
                    🍽️
                </div>
                <span>Food</span>
            </div>
            <div className="legend-item">
                <div className="legend-color shelter-marker">
                    🏠
                </div>
                <span>Shelter</span>
            </div>
            <div className="legend-item">
                <div className="legend-color health-marker">
                    ⚕️
                </div>
                <span>Health</span>
            </div>
            <div className="legend-item">
                <div className="legend-color user-marker">
                    📍
                </div>
                <span>Your Location</span>
            </div>
        </div>
    );
}

export default function FindHelp() {
    const [userLocation, setUserLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [locationError, setLocationError] = useState(null);
    const mapRef = useRef(null);

    // Get user location with better error handling
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser');
            setIsLoading(false);
            return;
        }

        const successHandler = (position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
            setIsLoading(false);
        };

        const errorHandler = (error) => {
            console.error('Error getting location:', error);
            let errorMessage = 'Unable to get your location';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Please allow location access in your browser settings';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out';
                    break;
                default:
                    errorMessage = 'An unknown error occurred';
            }
            setLocationError(errorMessage);
            setIsLoading(false);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        // Request location immediately when component mounts
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    }, []); // Empty dependency array means this runs once when component mounts

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
                    <FaLocationArrow />
                </button>
                <button 
                    className={`filter-btn ${showFilters ? 'active' : ''}`}
                    onClick={() => setShowFilters(!showFilters)}
                    title="Toggle filters"
                >
                    <FaFilter />
                </button>
            </div>

            {showFilters && (
                <div className="filter-panel">
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
                    zoom={11}
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                    ref={mapRef}
                >
                    <ChangeView center={userLocation} zoom={11} />
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
                    {locationError}
                </div>
            )}
        </div>
    );
} 