const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    hello: () => "Hello World",
    getAllEmployees: async () => await Employee.find(),
    getEmployee: async (_, { id }) => await Employee.findById(id),
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({
        $or: [
          { designation },
          { department }
        ]
      });
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, user };
    },

    createEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      const employee = new Employee({
        first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo
      });
      await employee.save();
      return employee;
    },

    updateEmployee: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      return await Employee.findByIdAndUpdate(id, {
        first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo
      }, { new: true });
    },

    deleteEmployee: async (_, { id }) => {
      return await Employee.findByIdAndDelete(id);
    }
  }
};

module.exports = resolvers;
