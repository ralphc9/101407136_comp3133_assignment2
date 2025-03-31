const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
    getAllEmployees: [Employee]
    getEmployee(id: ID!): Employee
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload
    createEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!, employee_photo: String): Employee
    updateEmployee(id: ID!, first_name: String, last_name: String, email: String, gender: String, designation: String, salary: Float, date_of_joining: String, department: String, employee_photo: String): Employee
    deleteEmployee(id: ID!): Employee
  }

  type Employee {
    id: ID
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: String
    department: String
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type User {
    id: ID
    username: String
    email: String
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
