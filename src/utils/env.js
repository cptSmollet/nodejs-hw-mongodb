import dotenv from 'dotenv';

dotenv.config();

const checkEnvVariables = () => {
  const requiredEnvVars = ['MONGODB_USER', 'MONGODB_PASSWORD', 'MONGODB_URL', 'MONGODB_DB'];
  
  requiredEnvVars.forEach((variable) => {
    if (!process.env[variable]) {
      console.error(`Missing required environment variable: ${variable}`);
      process.exit(1);  
    }
  });
};


const loadEnv = () => {
  checkEnvVariables();
};

export { loadEnv };
