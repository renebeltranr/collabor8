const app = require('../build/index.js');
const supertest = require('supertest');
const request = supertest(app);
let session = supertest.agent(app);
const mocks = require('./mocks.js');
const Users = require('../build/models/user.js');

jest.setTimeout(3000);

describe('User endpoints', () => {
  beforeEach(async () => {
    session = supertest.agent(app);
  });
  afterEach(async () => {
    await Users.deleteOne({ username: mocks.user.username});
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      expect(register.status).toEqual(201);
      //expect(register.body.acknowledged).toEqual(true);
    });
  })
});
