const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const resolvers = {
  Query: {
    hello: () => "Hello World",
    getEmployees: async () => {
      return await Employee.find();
    },
    getEmployee: async (_, { id }) => {
      return await Employee.findById(id);
    },
    searchEmployees: async (_, { department, position }) => {
      const query = {};
      if (department) query.department = department;
      if (position) query.position = position;
      return await Employee.find(query);
    },
    getCurrentUser: async (_, __, { user }) => {
      if (!user) return null;
      return await User.findById(user.userId);
    }
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      
      return user;
    },

    login: async (_, { username, password }) => {
      // Find user
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      // Verify password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      return {
        token,
        user
      };
    },

    addEmployee: async (_, { firstName, lastName, email, gender, salary, position, department, profilePicture }) => {
      const employee = new Employee({
        firstName,
        lastName,
        email,
        gender,
        salary,
        position,
        department,
        profilePicture
      });
      
      return await employee.save();
    },

    updateEmployee: async (_, { id, firstName, lastName, email, gender, salary, position, department, profilePicture }) => {
      const updates = {};
      if (firstName !== undefined) updates.firstName = firstName;
      if (lastName !== undefined) updates.lastName = lastName;
      if (email !== undefined) updates.email = email;
      if (gender !== undefined) updates.gender = gender;
      if (salary !== undefined) updates.salary = salary;
      if (position !== undefined) updates.position = position;
      if (department !== undefined) updates.department = department;
      if (profilePicture !== undefined) updates.profilePicture = profilePicture;

      return await Employee.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
    },

    deleteEmployee: async (_, { id }) => {
      return await Employee.findByIdAndDelete(id);
    }
  }
};

module.exports = resolvers;