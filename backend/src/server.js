const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

// Import GraphQL schema and resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Middleware for auth
const authMiddleware = require('./middleware/auth');

const app = express();

// Enable CORS with specific options for Angular
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4000'],
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json({ limit: '50mb' }));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return authMiddleware(req);
  },
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      path: error.path
    };
  }
});

// Start the Apollo Server
async function startServer() {
  await server.start();

  // Apply Apollo Server middleware
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  // MongoDB connection
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

  // Serve static files
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Start Express server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Run the server
startServer();