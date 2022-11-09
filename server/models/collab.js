'use strict';

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const CollabSchema = new Schema({ 
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: `My new collab`,
    required: true,
  },
  tracks: {
    type: Array,
    default: [],
    required: true,
  }
}); 

module.exports = mongoose.model('Collab', CollabSchema);


