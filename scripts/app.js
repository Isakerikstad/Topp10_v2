require('./db'); // Import the database connection configuration

const express = require('express'); // Import Express framework
const cors = require('cors'); // Import CORS middleware

const app = express(); // Create an Express application

// Middleware to parse JSON data in the request body
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Import routes
const quizRoutes = require('./routes/quizRoutes'); // Import quiz routes

// Use the routes
app.use('/quizzes', quizRoutes); // Use quiz routes for endpoints starting with /quizzes

const PORT = process.env.PORT || 5500; // Define the port to run the server

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send "Hello World!" as the response
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log a message when the server starts
});
