import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Resources.css";
import ResourceChat from './components/ResourceChat';

export const resourceList = [
  {
    name: "Multi-Service Center Food Bank",
    category: "Food",
    lat: 47.2985,
    lon: -122.3120,
    address: "1200 S. 336th St., Federal Way, WA 98003",
    phone: "(253) 838-6810",
    website: "https://mschelps.org/gethelp/food/",
    requirements: "Photo ID, proof of residence in service area (Federal Way, Des Moines, or Auburn), proof of income if applicable",
    services: ["Emergency food assistance", "Weekly food bank access", "Nutrition education", "Baby supplies", "Pet food when available"],
    hours: "Tuesday-Friday 9am-3pm",
    languages: "English, Spanish, Ukrainian, Russian"
  },
  {
    name: "The Salvation Army Federal Way Corps",
    category: "Shelter",
    lat: 47.3122,
    lon: -122.3355,
    address: "Federal Way, WA",
    phone: "(253) 946-7001",
    website: "https://federalway.salvationarmy.org/federal_way_corps/cure-hunger/",
    requirements: "Valid ID, intake interview required",
    services: ["Emergency shelter", "Transitional housing", "Food assistance", "Utility assistance", "Case management"],
    hours: "Monday-Friday 9am-5pm",
    languages: "English, Spanish"
  },
  {
    name: "Federal Way Day Center",
    category: "Shelter",
    lat: 47.3170,
    lon: -122.2960,
    address: "33505 13th Pl S, Federal Way, WA 98003",
    phone: "(253) 893-7895",
    website: "https://ccsww.org/services/federal-way-day-center/",
    requirements: "No formal requirements, walk-ins welcome",
    services: "Day shelter, showers, laundry, mail service, case management, housing navigation, basic needs",
    hours: "Monday-Friday 8am-5pm",
    languages: "English, Spanish, Somali"
  },
  {
    name: "FUSION Family Center",
    category: "Shelter",
    lat: 47.3176,
    lon: -122.3126,
    address: "1505 S 328th St, Federal Way, WA 98003",
    phone: "(253) 874-1257",
    website: "https://fusionhousing.org/",
    requirements: "Families with children, intake assessment required, referral preferred",
    services: "Transitional housing, case management, life skills training, employment assistance",
    hours: "Monday-Friday 9am-5pm",
    languages: "English, Spanish"
  },
  {
    name: "Tacoma Rescue Mission",
    category: "Shelter",
    lat: 47.2380,
    lon: -122.4358,
    address: "425 South Tacoma Way, Tacoma, WA 98402",
    phone: "(253) 383-4493",
    website: "https://www.trm.org/",
    requirements: "Valid ID preferred but not required, sobriety required",
    services: "Emergency shelter, meals, addiction recovery, employment training, veterans services",
    hours: "24/7 for emergency shelter, Office: Monday-Friday 9am-5pm",
    languages: "English, Spanish"
  },
  {
    name: "Christian Faith Center Community Meal",
    category: "Food",
    lat: 47.2980,
    lon: -122.3120,
    address: "33645 20th Ave S, Federal Way, WA 98003",
    phone: "(253) 943-2400",
    website: "https://www.christianfaith.us/",
    requirements: "No requirements, all are welcome",
    services: "Hot meals, food pantry, clothing closet, community support",
    hours: "Community Meal: Wednesday 5pm-7pm, Food Pantry: Saturday 9am-11am",
    languages: "English, Spanish"
  },
  {
    name: "Newport Food Bank",
    category: "Food",
    lat: 47.5301,
    lon: -121.8420,
    address: "35131 SE Douglas St, Snoqualmie, WA 98065",
    phone: "(425) 888-0096",
    website: "https://www.snoqualmievalleyfoodbank.org/",
    requirements: "Proof of residence in Snoqualmie Valley area",
    services: "Food assistance, fresh produce, dairy, meat, non-perishables, personal care items",
    hours: "Wednesday 9:30am-6:30pm",
    languages: "English"
  },
  {
    name: "Hopelink",
    category: "Health",
    lat: 47.3853,
    lon: -122.2340,
    address: "515 W Harrison St, Kent, WA 98032",
    phone: "(253) 850-2523",
    website: "https://www.hopelink.org/",
    requirements: "Varies by program, proof of income and residence may be required",
    services: "Healthcare navigation, insurance enrollment, prescription assistance, mental health referrals, food bank",
    hours: "Monday-Thursday 8:30am-5pm, Friday 8:30am-2pm",
    languages: "English, Spanish, Russian, Ukrainian"
  }
];

function Resources() {
  const [userLocation, setUserLocation] = useState([47.2985, -122.3120]);
  const [locationFound, setLocationFound] = useState(false);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [mapRef, setMapRef] = useState(null);
  const [activeTab, setActiveTab] = useState('map');

  const filteredResources = filter === "All" ? resourceList : resourceList.filter(resource => resource.category === filter);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          setLocationFound(true);
          setIsLoading(false);
          
          // Find bounds that include user location and all visible resources
          if (mapRef) {
            const bounds = L.latLngBounds([newLocation]);
            filteredResources.forEach(resource => {
              bounds.extend([resource.lat, resource.lon]);
            });
            mapRef.fitBounds(bounds, { padding: [50, 50] });
          }
        },
        () => {
          console.log("User denied location access.");
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, [mapRef, filter, filteredResources]);

  // Custom icons
  const userIcon = L.divIcon({
    className: 'custom-user-marker',
    html: '<div class="user-marker-icon">📍</div>',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  const resourceIcons = {
    Food: L.divIcon({
      className: 'custom-resource-marker',
      html: '<div class="resource-marker-icon food-icon">🍽️</div>',
      iconSize: [35, 35],
      iconAnchor: [17, 35],
      popupAnchor: [0, -35]
    }),
    Shelter: L.divIcon({
      className: 'custom-resource-marker',
      html: '<div class="resource-marker-icon shelter-icon">🏠</div>',
      iconSize: [35, 35],
      iconAnchor: [17, 35],
      popupAnchor: [0, -35]
    }),
    Health: L.divIcon({
      className: 'custom-resource-marker',
      html: '<div class="resource-marker-icon health-icon">⚕️</div>',
      iconSize: [35, 35],
      iconAnchor: [17, 35],
      popupAnchor: [0, -35]
    })
  };

  function ChangeMapView({ coords }) {
    const map = useMap();
    useEffect(() => {
      if (locationFound) {
        const bounds = L.latLngBounds([coords]);
        filteredResources.forEach(resource => {
          bounds.extend([resource.lat, resource.lon]);
        });
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [coords, map]);
    return null;
  }

  function RecenterButton({ setUserLocation, setLocationFound }) {
    const map = useMap();

    function recenterMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newCoords = [position.coords.latitude, position.coords.longitude];
            setUserLocation(newCoords);
            setLocationFound(true);
            map.setView(newCoords, 14); // Closer zoom when centering on user
          },
          () => {
            alert("Location access denied.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    return (
      <button 
        onClick={recenterMap} 
        className="recenter-button"
      >
        📍 Center on Me
      </button>
    );
  }

  if (isLoading) {
    return (
      <div className="resources-container loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="resources-container">
      <div className="map-header">
        <h1>Nearby Resources</h1>
        <div className="view-toggle">
          <button 
            className={`toggle-button ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺️ Map View
          </button>
          <button 
            className={`toggle-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat Assistant
          </button>
        </div>
      </div>

      {activeTab === 'map' ? (
        <>
          <div className="filters">
            <button onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""}>All</button>
            <button onClick={() => setFilter("Shelter")} className={filter === "Shelter" ? "active" : ""}>Shelter</button>
            <button onClick={() => setFilter("Food")} className={filter === "Food" ? "active" : ""}>Food</button>
            <button onClick={() => setFilter("Health")} className={filter === "Health" ? "active" : ""}>Health</button>
          </div>

          <div className="map-wrapper">
            <MapContainer 
              center={userLocation} 
              zoom={12} 
              className="map-container"
              ref={setMapRef}
            >
              <RecenterButton setUserLocation={setUserLocation} setLocationFound={setLocationFound} />
              <ChangeMapView coords={userLocation} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locationFound && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <strong>Your Location</strong><br />
                    This is your detected position.
                  </Popup>
                </Marker>
              )}
              {filteredResources.map((resource, index) => (
                <Marker 
                  key={index} 
                  position={[resource.lat, resource.lon]} 
                  icon={resourceIcons[resource.category]}
                >
                  <Popup>
                    <div className="resource-popup">
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
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="resources-list">
            <h2>Available Resources ({filteredResources.length})</h2>
            <div className="resource-cards">
              {filteredResources.map((resource, index) => (
                <div key={index} className="resource-card">
                  <div className="resource-card-header">
                    <h3>{resource.name}</h3>
                    <span className="category-icon">
                      {resource.category === 'Food' ? '🍽️' : 
                       resource.category === 'Shelter' ? '🏠' : '⚕️'}
                    </span>
                  </div>
                  <p className="category">{resource.category}</p>
                  <p>{resource.address}</p>
                  <p>{resource.phone}</p>
                  <div className="resource-links">
                    <a 
                      href={resource.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="website-button"
                    >
                      Website
                    </a>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lon}&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-button"
                    >
                      <span className="icon">🚗</span> Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <ResourceChat resources={resourceList} />
      )}
    </div>
  );
}

export default Resources;

