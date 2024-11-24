require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const connectDB = require('../config/database'); 

beforeAll(async () => {
  await connectDB(); 
});

beforeEach(async () => {
  await User.deleteMany({}); 
});

afterAll(async () => {
  await mongoose.connection.close(); 
});

describe('Auth Endpoints E2E Tests', () => {
  
  it('should register a user successfully', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test Student',
        email: 'student@example.com',
        password: 'password123',
        role: 'student',
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');

    const user = await User.findOne({ email: 'student@example.com' });
    expect(user).not.toBeNull();
    expect(user.role).toBe('student');
  });
});









