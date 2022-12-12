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
    await Users.deleteOne({ username: mocks.user.username });
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      expect(register.status).toEqual(201);
    });
    
    it('should not register user if it already exists', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const reRegister = await request.post('/register').send(user);
      expect(reRegister.status).toEqual(409);
      expect(JSON.parse(reRegister.text).message).toEqual('User already exists');
    });
  })
    

  describe('login', () => {
    it('should login user', async () => {
      const user = mocks.user;
      const register = await request.post('/register').send(user);
      const registeredUser = await Users
        .findOne({ username: user.username });

      const login = await session
        .post('/login')
        .send({ username: user.username, password: user.password });
      expect(login.body.email).toEqual(registeredUser.email);
      expect(login.body.password).toEqual(registeredUser.password);
    });
  });
});