import React, { useState, useEffect } from 'react';
import regionalServices from '../regional_services.json';
import './ResourcesList.css';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';

export default function ResourcesList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedHouseholdType, setSelectedHouseholdType] = useState('');
    const [selectedSubPopulation, setSelectedSubPopulation] = useState('');
    const [filteredResources, setFilteredResources] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favoriteResources');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [availableFilters, setAvailableFilters] = useState({
        types: new Set(),
        regions: new Set(),
        householdTypes: new Set(),
        subPopulations: new Set()
    });

    // Initialize filters
    useEffect(() => {
        const filters = {
            types: new Set(),
            regions: new Set(),
            householdTypes: new Set(),
            subPopulations: new Set()
        };

        regionalServices.forEach(service => {
            if (service["Type of Program"]) filters.types.add(service["Type of Program"]);
            if (service["Sub-Region"]) filters.regions.add(service["Sub-Region"]);
            if (service["Household type"]) {
                service["Household type"].split(',').forEach(type => 
                    filters.householdTypes.add(type.trim())
                );
            }
            if (service["Sub-population type"]) filters.subPopulations.add(service["Sub-population type"]);
        });

        setAvailableFilters(filters);
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('favoriteResources', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (resource) => {
        setFavorites(prevFavorites => {
            const resourceId = resource.ProgramName;
            if (prevFavorites.includes(resourceId)) {
                return prevFavorites.filter(id => id !== resourceId);
            } else {
                return [...prevFavorites, resourceId];
            }
        });
    };

    const isFavorite = (resource) => {
        return favorites.includes(resource.ProgramName);
    };

    const handleSearch = () => {
        setHasSearched(true);
        const filtered = regionalServices.filter(resource => {
            const matchesSearch = !searchTerm || 
                resource.ProgramName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource["Service Provider Organization"]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource["Sub-Region"]?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesType = !selectedType || resource["Type of Program"] === selectedType;
            const matchesRegion = !selectedRegion || resource["Sub-Region"] === selectedRegion;
            const matchesHouseholdType = !selectedHouseholdType || 
                (resource["Household type"] && resource["Household type"].includes(selectedHouseholdType));
            const matchesSubPopulation = !selectedSubPopulation || 
                resource["Sub-population type"] === selectedSubPopulation;
            
            return matchesSearch && matchesType && matchesRegion && 
                   matchesHouseholdType && matchesSubPopulation;
        });
        setFilteredResources(filtered);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedType('');
        setSelectedRegion('');
        setSelectedHouseholdType('');
        setSelectedSubPopulation('');
        setHasSearched(false);
        setFilteredResources([]);
    };

    const displayedResources = showOnlyFavorites
        ? regionalServices.filter(resource => isFavorite(resource))
        : (hasSearched ? filteredResources : []);

    return (
        <div className="resources-list-container">
            <h1>Community Resources</h1>
            
            <div className="search-filters">
                <div className="filters-group">
                    <input
                        type="text"
                        placeholder="Search by name, organization, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Select Program Type</option>
                        {[...availableFilters.types].sort().map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Select Region</option>
                        {[...availableFilters.regions].sort().map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    <select
                        value={selectedHouseholdType}
                        onChange={(e) => setSelectedHouseholdType(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Select Household Type</option>
                        {[...availableFilters.householdTypes].sort().map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <select
                        value={selectedSubPopulation}
                        onChange={(e) => setSelectedSubPopulation(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Select Sub-Population</option>
                        {[...availableFilters.subPopulations].sort().map(population => (
                            <option key={population} value={population}>{population}</option>
                        ))}
                    </select>
                </div>
                <div className="buttons-group">
                    <button onClick={handleSearch} className="search-button">
                        <FaSearch /> Search
                    </button>
                    <button onClick={clearFilters} className="clear-button">
                        Clear Filters
                    </button>
                    <button 
                        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                        className={`favorites-toggle ${showOnlyFavorites ? 'active' : ''}`}
                    >
                        {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
                    </button>
                </div>
            </div>

            <div className="results-section">
                <div className="results-list">
                    {!hasSearched && !showOnlyFavorites ? (
                        <div className="initial-state">
                            Use the filters above to search for resources
                        </div>
                    ) : displayedResources.length === 0 ? (
                        <div className="no-results">
                            No resources match your search criteria. Try adjusting your filters.
                        </div>
                    ) : (
                        displayedResources.map((resource, index) => (
                            <div key={index} className="result-item">
                                <div className="result-header">
                                    <h3>{resource.ProgramName}</h3>
                                    <button 
                                        onClick={() => toggleFavorite(resource)}
                                        className={`favorite-button ${isFavorite(resource) ? 'favorited' : ''}`}
                                        aria-label={isFavorite(resource) ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFavorite(resource) ? <FaHeart /> : <FaRegHeart />}
                                    </button>
                                </div>
                                <p><strong>Organization:</strong> {resource["Service Provider Organization"]}</p>
                                <p><strong>Type:</strong> {resource["Type of Program"]}</p>
                                <p><strong>Location:</strong> {resource["Sub-Region"]}</p>
                                {resource["Household type"] && (
                                    <p><strong>Serves:</strong> {resource["Household type"]}</p>
                                )}
                                {resource["Sub-population type"] && (
                                    <p><strong>Population Focus:</strong> {resource["Sub-population type"]}</p>
                                )}
                                {resource["Case Management"] && (
                                    <p><strong>Case Management:</strong> {resource["Case Management"]}</p>
                                )}
                                {resource["Food/Meals"] && (
                                    <p><strong>Food/Meals:</strong> {resource["Food/Meals"]}</p>
                                )}
                                {resource["Hygiene"] && (
                                    <p><strong>Hygiene:</strong> {resource["Hygiene"]}</p>
                                )}
                                {resource["Length of Stay"] && (
                                    <p><strong>Length of Stay:</strong> {resource["Length of Stay"]}</p>
                                )}
                                {resource["Pets Allowed"] && (
                                    <p><strong>Pets:</strong> {resource["Pets Allowed"]}</p>
                                )}
                                <div className="resource-links">
                                    {resource.address && (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource["Sub-Region"])}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="directions-link"
                                        >
                                            View on Map
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
} 