const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    salary: Float!
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, position: String!, salary: Float!): Employee
    updateEmployee(id: ID!, name: String, position: String, salary: Float): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
