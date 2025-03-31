const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

// Load environment variables
dotenv.config();
console.log("MongoDB URI: ", process.env.MONGODB_URI);

// Import GraphQL schema and resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Middleware for auth
const authMiddleware = require('./middleware/auth');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return authMiddleware(req);
  }
});

// Start the Apollo Server
async function startServer() {
  await server.start();

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: '/graphql' });

  // MongoDB Atlas connection
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.log('MongoDB Atlas connection error: ', err));

  // Serve static files (for file uploads, etc.)
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Start Express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint at http://localhost:${PORT}/graphql`);
  });
}

// Run the server
startServer();
