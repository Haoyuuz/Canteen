const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// Create a Redis client
const client = redis.createClient({
  host: 'localhost', // Redis server address
  port: 6379, // Redis port
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

// Set a route that uses Redis cache
app.get('/data', (res: any) => {
  const cacheKey = 'myDataCache';

  // Check if data exists in cache
  client.get(cacheKey, (err: any, cachedData: any) => {
    if (cachedData) {
      console.log('Cache hit');
      return res.json(JSON.parse(cachedData)); // Send cached data
    }

    console.log('Cache miss');
    // If no cache, fetch data from the database or other source
    const newData = { message: 'Hello, this is data from the server' };

    // Set data in cache for future use
    client.setex(cacheKey, 3600, JSON.stringify(newData)); // Cache for 1 hour

    return res.json(newData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
