import Employee from './models/Employee';

export const resolvers = {
  Query: {
    getEmployees: async () => await Employee.find(),
  },
  Mutation: {
    addEmployee: async (_, { name, position, department }) => {
      const newEmp = new Employee({ name, position, department });
      return await newEmp.save();
    },
    deleteEmployee: async (_, { id }) => {
      return await Employee.findByIdAndRemove(id);
    },
  },
};
