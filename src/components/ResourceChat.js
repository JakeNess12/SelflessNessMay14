import React, { useState, useRef, useEffect } from 'react';
import './ResourceChat.css';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001'
  : 'http://10.0.0.29:3001';

const PRESET_PROMPTS = [
  { id: 'food', text: 'I need food assistance', icon: 'fas fa-utensils' },
  { id: 'shelter', text: 'I need shelter', icon: 'fas fa-home' },
  { id: 'health', text: 'I need healthcare', icon: 'fas fa-heartbeat' },
  { id: 'mental', text: 'I need mental health support', icon: 'fas fa-brain' },
  { id: 'crisis', text: "I'm in crisis", icon: 'fas fa-exclamation-circle' },
  { id: 'substance', text: 'I need substance abuse help', icon: 'fas fa-hand-holding-medical' }
];

const MAX_CHARS = 50;
const FREE_MESSAGE_LIMIT = 5;

const ResourceChat = ({ resources }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageCount, setMessageCount] = useState(() => {
    const count = localStorage.getItem('chatMessageCount');
    return count ? parseInt(count) : 0;
  });
  const [showPromptsDropdown, setShowPromptsDropdown] = useState(false);
  const [userType, setUserType] = useState(null);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    if (!userType) {
      setMessages([{
        role: 'assistant',
        content: "Welcome! Are you someone seeking assistance, or a volunteer helping others?"
      }]);
    } else {
      setMessages([{
        role: 'assistant',
        content: `Hi! I'm here to help ${userType === 'seeker' ? 'you' : 'connect people'} with local resources. Select a topic below or type your question.`
      }]);
    }
  }, [userType]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };

  const generateSystemMessage = () => {
    const resourceInfo = resources.slice(0, 50).map(r => ({
      name: r.ProgramName,
      type: r["Type of Program"],
      region: r["Sub-Region"],
      services: {
        caseManagement: r["Case Management"],
        housingNavigation: r["Housing Navigation"],
        substanceUseTreatment: r["Substance Use Disorder Treatment"],
        behavioralHealth: r["Behavioral Health Supports"],
        healthCare: r["Health Care"],
        foodMeals: r["Food/Meals"],
        hygiene: r["Hygiene"]
      },
      requirements: {
        householdType: r["Household type"],
        subPopulation: r["Sub-population type"],
        petsAllowed: r["Pets Allowed"],
        lengthOfStay: r["Length of Stay"]
      }
    }));

    return `You are a helpful assistant for a community resources application. Your role is to help users find appropriate resources based on their needs.

Available resources: ${JSON.stringify(resourceInfo)}

Guidelines:
1. ONLY recommend resources from the provided list above
2. Ask specific questions to understand the user's needs:
   - What type of assistance they need (shelter, food, healthcare, etc.)
   - Their location/region
   - Any specific requirements (household type, sub-population needs)
   - Any special needs (pets, accessibility, etc.)
   - Urgency of their need

3. When recommending resources:
   - Start with the most relevant to their needs
   - Include the program name and type
   - Mention available services
   - Note any restrictions or requirements
   - Include the region/location

4. Important rules:
   - If someone needs immediate emergency assistance (medical, safety), always recommend calling 911
   - For domestic violence situations, provide the National Domestic Violence Hotline: 1-800-799-SAFE
   - Keep responses concise but informative
   - Be empathetic and supportive
   - If unsure about specific details, recommend calling the resource directly
   - NEVER recommend resources that aren't in the provided list

5. Format responses clearly:
   - Use bullet points for lists
   - Bold important information
   - Separate different resources with clear breaks
   - Include available services and requirements`;
  };

  const handlePresetPrompt = (prompt) => {
    if (messageCount >= FREE_MESSAGE_LIMIT) {
      setError("You've reached the free message limit. Please use the keyword search or contact support for unlimited access.");
      return;
    }
    setInput(prompt.text);
    sendMessage(prompt.text);
    setShowPromptsDropdown(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setInput(value);
    }
  };

  const sendMessage = async (userMessage = input.trim()) => {
    if (!userMessage) return;
    if (messageCount >= FREE_MESSAGE_LIMIT) {
      setError("You've reached the free message limit. Please use the keyword search or contact support for unlimited access.");
      return;
    }

    setInput('');
    setIsLoading(true);
    setError(null);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: generateSystemMessage() },
            ...messages,
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.content[0].text
        }]);
        
        // Update message count
        const newCount = messageCount + 1;
        setMessageCount(newCount);
        localStorage.setItem('chatMessageCount', newCount.toString());
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message || "An error occurred while connecting to the chat service.");
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!userType) {
    return (
      <div className="chat-container">
        <div className="user-type-selection">
          <h2>Welcome to Resource Chat</h2>
          <p>Please select how you'll be using this service:</p>
          <button onClick={() => handleUserTypeSelection('seeker')}>
            <i className="fas fa-hand-holding-heart"></i>
            I need assistance
          </button>
          <button onClick={() => handleUserTypeSelection('volunteer')}>
            <i className="fas fa-hands-helping"></i>
            I'm a volunteer helping others
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <div className="chat-header">
        <div className="prompt-dropdown">
          <button 
            className="prompt-dropdown-toggle"
            onClick={() => setShowPromptsDropdown(!showPromptsDropdown)}
          >
            <i className="fas fa-list-ul"></i>
            Common Questions
          </button>
          {showPromptsDropdown && (
            <div className="prompt-dropdown-menu">
              {PRESET_PROMPTS.map(prompt => (
                <button
                  key={prompt.id}
                  className="preset-prompt-btn"
                  onClick={() => handlePresetPrompt(prompt)}
                  disabled={messageCount >= FREE_MESSAGE_LIMIT}
                >
                  <i className={prompt.icon}></i>
                  {prompt.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-limit-indicator">
        {messageCount < FREE_MESSAGE_LIMIT ? (
          <span>{FREE_MESSAGE_LIMIT - messageCount} free messages remaining</span>
        ) : (
          <span>Free message limit reached. Please use keyword search or contact support.</span>
        )}
      </div>
      <div className="chat-input">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            rows="1"
            disabled={messageCount >= FREE_MESSAGE_LIMIT}
          />
          <div className="char-counter">
            {input.length}/{MAX_CHARS}
          </div>
        </div>
        <button 
          onClick={() => sendMessage()}
          disabled={isLoading || !input.trim() || messageCount >= FREE_MESSAGE_LIMIT}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ResourceChat; 