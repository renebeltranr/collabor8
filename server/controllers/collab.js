const Collab = require('./../models/collab');
const User = require('./../models/user');

const create = async (req, res) => {
  try {
    console.log(req.body)
    const newCollab = new Collab({
      owner: req.session.uid,
      name: req.body.name.name,
      tracks: req.body.name.tracks
    });
    const cb = await newCollab.save();
    console.log("CB: ", cb)
    const user = await User.findById(req.session.uid);
    user.owncollabs.push(cb._id);
    const result = await user.save();
    res.status(201).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create Collab' });
  }
};

const getAll = async (req, res) => {
  try {
    const cb = await Collab.find().populate('owner');
    res.status(200).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not get all Collabs' });
  }
};

const getUserCollabs = async (req, res) => {
  try {
    const uid = req.session.uid;
    console.log(uid)
    const cb = await Collab.find({owner: uid});
    console.log(cb)
    res.status(200).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not user Collabs' });
  }
};

module.exports = { create, getAll, getUserCollabs };
