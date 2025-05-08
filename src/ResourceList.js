import React, { useEffect, useState } from 'react';
import "./ResourceList.css";
import regionalServices from './regional_services.json';

const ResourcesList = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    typeOfProgram: '',
    subRegion: '',
    householdType: '',
    keyword: '',
  });
  const [filteredData, setFilteredData] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Initialize favorites from localStorage
    const savedFavorites = localStorage.getItem('resourceFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setData(regionalServices);
    // Only show favorites initially
    setFilteredData(favorites);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('resourceFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const normalizeValues = (value) => {
    return value.split(',').map(v => v.trim().toLowerCase());
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.typeOfProgram && filters.typeOfProgram !== 'All') {
      filtered = filtered.filter(row => {
        const values = row['Type of Program'] ? normalizeValues(row['Type of Program']) : [];
        return values.includes(filters.typeOfProgram.toLowerCase());
      });
    }

    if (filters.subRegion && filters.subRegion !== 'All') {
      filtered = filtered.filter(row => {
        const values = row['Sub-Region'] ? normalizeValues(row['Sub-Region']) : [];
        return values.includes(filters.subRegion.toLowerCase());
      });
    }

    if (filters.householdType && filters.householdType !== 'All') {
      filtered = filtered.filter(row => {
        const values = row['Household type'] ? normalizeValues(row['Household type']) : [];
        return values.includes(filters.householdType.toLowerCase());
      });
    }

    if (filters.keyword) {
      filtered = filtered.filter(row => {
        return Object.values(row).some(value => 
          typeof value === 'string' && 
          value.toLowerCase().includes(filters.keyword.toLowerCase())
        );
      });
    }

    // Combine filtered results with favorites
    const combinedResults = [...new Set([...filtered, ...favorites])];
    setFilteredData(combinedResults);
    setShowResults(true);
  };

  const handleButtonClick = (resource) => {
    setSelectedResource(resource);
    if (resource) {
      setTimeout(() => {
        document.querySelector('.resource-details')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const getUniqueValues = (key) => {
    const uniqueValues = new Set();
    data.forEach(item => {
      if (item[key]) {
        item[key].split(',').forEach(value => {
          const trimmedValue = value.trim();
          // Exclude 'unclear' from household type
          if (!(key === 'Household type' && trimmedValue.toLowerCase() === 'unclear')) {
            uniqueValues.add(trimmedValue);
          }
        });
      }
    });
    return Array.from(uniqueValues).sort();
  };

  const handleClearFilters = () => {
    setFilters({
      typeOfProgram: '',
      subRegion: '',
      householdType: '',
      keyword: '',
    });
    setShowResults(false);
    // Show only favorites when filters are cleared
    setFilteredData(favorites);
  };

  const toggleFavorite = (resource) => {
    const isFavorite = favorites.some(fav => fav.ProgramName === resource.ProgramName);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.ProgramName !== resource.ProgramName));
    } else {
      setFavorites([...favorites, resource]);
    }
  };

  const isFavorite = (resource) => {
    return favorites.some(fav => fav.ProgramName === resource.ProgramName);
  };

  return (
    <div className="resource-list-container">
      <h1>Available Resources</h1>
      <div className="filters">
        <label>
          Program Type
          <select 
            name="typeOfProgram" 
            value={filters.typeOfProgram} 
            onChange={handleFilterChange}
          >
            <option value="">All Programs</option>
            {getUniqueValues('Type of Program').map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Location
          <select 
            name="subRegion" 
            value={filters.subRegion} 
            onChange={handleFilterChange}
          >
            <option value="">All Locations</option>
            {getUniqueValues('Sub-Region').map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </label>
        <label>
          Household Type
          <select 
            name="householdType" 
            value={filters.householdType} 
            onChange={handleFilterChange}
          >
            <option value="">All Households</option>
            {getUniqueValues('Household type').map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          Search
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleFilterChange}
            placeholder="Enter keywords..."
          />
        </label>
        <div className="filter-buttons">
          <button onClick={applyFilters}>Apply Filters</button>
          <button onClick={handleClearFilters}>Clear All</button>
        </div>
      </div>

      {(!showResults && favorites.length > 0) && (
        <div className="favorites-section">
          <h2>Your Favorites</h2>
          <div className="resource-grid">
            {favorites.map((row, index) => (
              <div key={index} className="resource-button-container">
                <button 
                  className="resource-button" 
                  onClick={() => handleButtonClick(row)}
                >
                  <strong>{row['ProgramName']}</strong>
                  <div>
                    <p>{row['Type of Program']}</p>
                    <p>{row['Sub-Region']}</p>
                  </div>
                </button>
                <button 
                  className="favorite-button active"
                  onClick={() => toggleFavorite(row)}
                  aria-label="Remove from favorites"
                >
                  ★
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showResults && (
        <div className="resource-grid">
          {filteredData.map((row, index) => (
            <div key={index} className="resource-button-container">
              <button 
                className="resource-button" 
                onClick={() => handleButtonClick(row)}
              >
                <strong>{row['ProgramName']}</strong>
                <div>
                  <p>{row['Type of Program']}</p>
                  <p>{row['Sub-Region']}</p>
                </div>
              </button>
              <button 
                className={`favorite-button ${isFavorite(row) ? 'active' : ''}`}
                onClick={() => toggleFavorite(row)}
                aria-label={isFavorite(row) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(row) ? '★' : '☆'}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedResource && (
        <div className="resource-details">
          <h2>{selectedResource['ProgramName']}</h2>
          <button 
            className={`favorite-button large ${isFavorite(selectedResource) ? 'active' : ''}`}
            onClick={() => toggleFavorite(selectedResource)}
          >
            {isFavorite(selectedResource) ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
          <p><strong>Service Provider:</strong> {selectedResource['Service Provider Organization']}</p>
          <p><strong>Location:</strong> {selectedResource['Sub-Region']}</p>
          <p><strong>District:</strong> {selectedResource['Jurisdiction/CoS Council District']}</p>
          <p><strong>Program Type:</strong> {selectedResource['Type of Program']}</p>
          <p><strong>KCRHA Funded:</strong> {selectedResource['Funded by KCRHA']}</p>
          <p><strong>Public Funders:</strong> {selectedResource['Public Funders']}</p>
          <p><strong>HMIS Participating:</strong> {selectedResource['HMIS Participating']}</p>
          <p><strong>Program ID:</strong> {selectedResource['HMIS Program ID']}</p>
          <p><strong>Last Verified:</strong> {new Date(selectedResource['Entry Last Verified']).toLocaleDateString()}</p>
          <p><strong>Bed Inventory:</strong> {selectedResource['Total Bed Inventory']}</p>
          <p><strong>Household Type:</strong> {selectedResource['Household type']}</p>
          <p><strong>Sub-population:</strong> {selectedResource['Sub-population type']}</p>
          <p><strong>Case Management:</strong> {selectedResource['Case Management']}</p>
          <p><strong>Housing Navigation:</strong> {selectedResource['Housing Navigation']}</p>
          <p><strong>Substance Treatment:</strong> {selectedResource['Substance Use Disorder Treatment']}</p>
          <p><strong>Healthcare:</strong> {selectedResource['Health Care']}</p>
          <p><strong>Unit Type:</strong> {selectedResource['Unit Type']}</p>
          <p><strong>Food/Meals:</strong> {selectedResource['Food/Meals']}</p>
          <p><strong>Hygiene:</strong> {selectedResource['Hygiene']}</p>
          <p><strong>Partners Allowed:</strong> {selectedResource['Partners Allowed']}</p>
          <p><strong>Pets Allowed:</strong> {selectedResource['Pets Allowed']}</p>
          <p><strong>Storage:</strong> {selectedResource['Storage']}</p>
          <p><strong>Length of Stay:</strong> {selectedResource['Length of Stay']}</p>
          <p><strong>Referrals:</strong> {selectedResource['Referrals']}</p>
          <p><strong>Last Modified:</strong> {selectedResource['Last Modified']}</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesList;
