const config = {
  CLAUDE_API_KEY: process.env.REACT_APP_CLAUDE_API_KEY || '',
};

// Validate required environment variables
const requiredEnvVars = ['REACT_APP_CLAUDE_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
}

export default config; 