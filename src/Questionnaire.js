import React, { useState } from "react";
import regionalServices from "./regional_services.json"; // Import the service data
import "./Questionnaire.css";

const Questionnaire = () => {
    const [responses, setResponses] = useState({
        needs_shelter: false,
        has_children: false,
        needs_food: false,
        needs_medical_help: false,
        has_pet: false,
        gender: "any",
        is_couple: false,
        needs_mental_health: false,
        needs_addiction: false,
        has_disability: false,
        preferred_location: "",
        language_needs: ""
    });

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setResponses({
            ...responses,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const findRecommendations = () => {
        setIsLoading(true);
        setShowResults(false);

        let filteredServices = [...regionalServices];

        // Filter by shelter needs
        if (responses.needs_shelter) {
            filteredServices = filteredServices.filter(
                (s) => {
                    const typeOfProgram = s["Type of Program"]?.toLowerCase() || "";
                    const householdType = s["Household type"]?.toLowerCase() || "";
                    const partnersAllowed = s["Partners Allowed"]?.toLowerCase() || "";

                    return (
                        (typeOfProgram.includes("shelter") || typeOfProgram.includes("housing")) &&
                        (householdType.includes(responses.gender) || householdType.includes("any") || responses.gender === "any") &&
                        (!responses.is_couple || partnersAllowed === "yes")
                    );
                }
            );
        }

        // Filter by food needs
        if (responses.needs_food) {
            const foodServices = regionalServices.filter(
                (s) => s["Type of Program"]?.toLowerCase().includes("food")
            );
            filteredServices = [...new Set([...filteredServices, ...foodServices])];
        }

        // Filter by medical needs
        if (responses.needs_medical_help) {
            const medicalServices = regionalServices.filter(
                (s) => s["Type of Program"]?.toLowerCase().includes("health")
            );
            filteredServices = [...new Set([...filteredServices, ...medicalServices])];
        }

        // Filter by mental health needs
        if (responses.needs_mental_health) {
            const mentalHealthServices = regionalServices.filter(
                (s) => s["Behavioral Health Supports"]?.toLowerCase() === "yes"
            );
            filteredServices = [...new Set([...filteredServices, ...mentalHealthServices])];
        }

        // Filter by addiction services
        if (responses.needs_addiction) {
            const addictionServices = regionalServices.filter(
                (s) => s["Substance Use Disorder Treatment"]?.toLowerCase() === "yes"
            );
            filteredServices = [...new Set([...filteredServices, ...addictionServices])];
        }

        // Filter by disability accommodations
        if (responses.has_disability) {
            filteredServices = filteredServices.filter(
                (s) => s["Sub-population type"]?.toLowerCase().includes("disabilities")
            );
        }

        // Filter by pet accommodations
        if (responses.has_pet) {
            filteredServices = filteredServices.filter(
                (s) => s["Pets Allowed"]?.toLowerCase() === "yes"
            );
        }

        // Filter by location preference
        if (responses.preferred_location) {
            filteredServices = filteredServices.filter(
                (s) => s["Sub-Region"]?.toLowerCase().includes(responses.preferred_location.toLowerCase())
            );
        }

        // Filter by language needs
        if (responses.language_needs) {
            filteredServices = filteredServices.filter(
                (s) => s["languages"]?.toLowerCase().includes(responses.language_needs.toLowerCase())
            );
        }

        // Simulate API delay
        setTimeout(() => {
            setResults(filteredServices);
            setIsLoading(false);
            setShowResults(true);
        }, 500);
    };

    return (
        <div className="questionnaire-container">
            <h2>Help Questionnaire</h2>
            <div className="questionnaire-form">
                <div className="form-group">
                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="needs_shelter" 
                            name="needs_shelter" 
                            checked={responses.needs_shelter} 
                            onChange={handleChange}
                            aria-label="Needs Shelter"
                        />
                        <label htmlFor="needs_shelter">Needs Shelter</label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="has_children" 
                            name="has_children" 
                            checked={responses.has_children} 
                            onChange={handleChange}
                            aria-label="Has Children"
                        />
                        <label htmlFor="has_children">Has Children</label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="needs_food" 
                            name="needs_food" 
                            checked={responses.needs_food} 
                            onChange={handleChange}
                            aria-label="Needs Food"
                        />
                        <label htmlFor="needs_food">Needs Food</label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="needs_medical_help" 
                            name="needs_medical_help" 
                            checked={responses.needs_medical_help} 
                            onChange={handleChange}
                            aria-label="Needs Medical Help"
                        />
                        <label htmlFor="needs_medical_help">Needs Medical Help</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="needs_mental_health" 
                            name="needs_mental_health" 
                            checked={responses.needs_mental_health} 
                            onChange={handleChange}
                            aria-label="Needs Mental Health Support"
                        />
                        <label htmlFor="needs_mental_health">Needs Mental Health Support</label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="needs_addiction" 
                            name="needs_addiction" 
                            checked={responses.needs_addiction} 
                            onChange={handleChange}
                            aria-label="Needs Addiction Services"
                        />
                        <label htmlFor="needs_addiction">Needs Addiction Services</label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="has_disability" 
                            name="has_disability" 
                            checked={responses.has_disability} 
                            onChange={handleChange}
                            aria-label="Has Disability"
                        />
                        <label htmlFor="has_disability">Has Disability</label>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="has_pet" 
                            name="has_pet" 
                            checked={responses.has_pet} 
                            onChange={handleChange}
                            aria-label="Has Pet"
                        />
                        <label htmlFor="has_pet">Has Pet</label>
                    </div>
                </div>

                <div className="form-group">
                    <div className="select-group">
                        <label htmlFor="gender">Gender:</label>
                        <select 
                            id="gender"
                            name="gender" 
                            value={responses.gender} 
                            onChange={handleChange}
                            aria-label="Select Gender"
                        >
                            <option value="any">Any</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                    </div>

                    <div className="select-group">
                        <label htmlFor="preferred_location">Preferred Location:</label>
                        <select 
                            id="preferred_location"
                            name="preferred_location" 
                            value={responses.preferred_location} 
                            onChange={handleChange}
                            aria-label="Select Preferred Location"
                        >
                            <option value="">Any Location</option>
                            <option value="seattle">Seattle</option>
                            <option value="tacoma">Tacoma</option>
                            <option value="bellevue">Bellevue</option>
                            <option value="federal way">Federal Way</option>
                        </select>
                    </div>

                    <div className="select-group">
                        <label htmlFor="language_needs">Language Needs:</label>
                        <select 
                            id="language_needs"
                            name="language_needs" 
                            value={responses.language_needs} 
                            onChange={handleChange}
                            aria-label="Select Language Needs"
                        >
                            <option value="">Any Language</option>
                            <option value="spanish">Spanish</option>
                            <option value="russian">Russian</option>
                            <option value="ukrainian">Ukrainian</option>
                            <option value="somali">Somali</option>
                        </select>
                    </div>

                    <div className="checkbox-group">
                        <input 
                            type="checkbox" 
                            id="is_couple" 
                            name="is_couple" 
                            checked={responses.is_couple} 
                            onChange={handleChange}
                            aria-label="Looking for Shelter as a Couple"
                        />
                        <label htmlFor="is_couple">Looking for Shelter as a Couple</label>
                    </div>
                </div>

                <button 
                    className="find-help-button"
                    onClick={findRecommendations}
                    disabled={isLoading}
                    aria-label="Find Help"
                >
                    {isLoading ? "Finding Resources..." : "Find Help"}
                </button>
            </div>

            {showResults && (
                <div className="results-section">
                    <h3>Recommended Resources ({results.length})</h3>
                    {results.length > 0 ? (
                        <div className="results-list">
                            {results.map((service, index) => (
                                <div key={index} className="result-item">
                                    <strong>{service["ProgramName"]}</strong>
                                    <p><strong>Location:</strong> {service["Sub-Region"]}</p>
                                    <p><strong>Provider:</strong> {service["Service Provider Organization"]}</p>
                                    <p><strong>Type:</strong> {service["Type of Program"]}</p>
                                    {service["Household type"] && (
                                        <p><strong>Accepts:</strong> {service["Household type"]}</p>
                                    )}
                                    {service["languages"] && (
                                        <p><strong>Languages:</strong> {service["languages"]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            No resources found matching your criteria. Please try adjusting your selections or contact 211 for additional assistance.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Questionnaire;