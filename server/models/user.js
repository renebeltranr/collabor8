'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const UserSchema = new Schema({ 
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: `Hey, I'm looking forward to collaborating with new fellow musicians!`,
    required: true,
  },
  profilepic: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  instruments: {
    type: Array,
    default: []
  },
  owncollabs: {
    type: Array,
    default: []
  },
  othercollabs: {
    type: Array,
    default: []
  },
}); 

module.exports = mongoose.model('User', UserSchema);


