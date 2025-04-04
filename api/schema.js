import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
  }

  type Query {
    getEmployees: [Employee]
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!): Employee
    deleteEmployee(id: ID!): Employee
  }
`;
