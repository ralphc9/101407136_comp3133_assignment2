const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getEmployees: [Employee]
    getEmployee(id: ID!): Employee
    searchEmployees(department: String, position: String): [Employee]
    getCurrentUser: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload
    addEmployee(
      firstName: String!,
      lastName: String!,
      email: String!,
      gender: String,
      salary: Float,
      position: String,
      department: String,
      profilePicture: String
    ): Employee
    updateEmployee(
      id: ID!,
      firstName: String,
      lastName: String,
      email: String,
      gender: String,
      salary: Float,
      position: String,
      department: String,
      profilePicture: String
    ): Employee
    deleteEmployee(id: ID!): Employee
  }

  type Employee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    gender: String
    salary: Float
    position: String
    department: String
    profilePicture: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;