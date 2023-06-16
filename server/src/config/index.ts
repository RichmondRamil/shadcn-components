import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
	// This error should crash whole process

	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	// Server port
	port: parseInt(process.env.PORT, 10),
	// Bunyan logger
	logs: {
		level: process.env.LOG_LEVEL,
		name: process.env.LOG_NAME,
	},
	// API configs
	api: {
		prefix: '/api',
	},
	// JWT configs
	jwt: {
		secret: process.env.JWT_SECRET,
	},
};
