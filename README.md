# SelflessNess - Community Outreach App

A React-based web application designed to connect individuals with essential community resources and services. The app features an interactive map interface and a comprehensive resource directory to help users find and access the help they need.

## Features

- **Interactive Map**: Find nearby resources with a user-friendly map interface
- **Resource Directory**: Browse a comprehensive list of community services
- **Resource Chat**: Get personalized assistance in finding resources
- **Training Resources**: Access educational materials
- **Community Support**: Connect with others and share experiences

## Technologies Used

- React
- React Router
- Leaflet Maps
- CSS3
- Node.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JakeNess12/SelflessNess.git
   ```

2. Navigate to the project directory:
   ```bash
   cd SelflessNess
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.development.local` file in the root directory with the following variables:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   PORT=3000
   ```
   Replace `your_openai_api_key_here` with your actual OpenAI API key.

5. Start the development server:
   ```bash
   npm start
   ```

The app will open in your default browser at `http://localhost:3000`.

## Environment Variables

The following environment variables are required to run the application:

- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key for the chat functionality
- `PORT`: The port number for the development server (default: 3000)

Make sure to never commit your `.env.development.local` file to version control. It is already included in the `.gitignore` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
