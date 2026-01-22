import { Redis } from 'ioredis';
// import dotenv from 'dotenv';
// dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined");
}

export const redisConnection = new Redis(process.env.REDIS_URL);

export const redisConfig = {
  url: process.env.REDIS_URL,
};

redisConnection.on('connect', () => {
    console.log('Redis connected');
});

redisConnection.on('error', (err) => {
    console.error('Redis error:', err);
});
