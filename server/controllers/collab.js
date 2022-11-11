const Collab = require('./../models/collab');
const User = require('./../models/user');

const create = async (req, res) => {
  try {
    console.log("BODYYYYYY", req.body)
    const newCollab = new Collab({
      owner: req.session.uid,
      name: req.body.name,
      tracks: req.body.tracks
    });
    console.log("NEWCOLLAB HEREEEEEEEE:", newCollab)
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
    const cb = await Collab.find().sort({tracks: -1}).populate('owner');
    res.status(200).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not get all Collabs' });
  }
};

const getUserCollabs = async (req, res) => {
  try {
    const uid = req.params.id
    const cb = await Collab.find({owner: uid});
    res.status(200).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not get user Collabs' });
  }
};

const getCollab = async (req, res) => {
  try {
    const cid = req.params;
    const cb = await Collab.find({_id: cid.id}).populate('owner');
    console.log(cb)
    res.status(200).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not get the Collab' });
  }
};

const saveTrack = async (req, res) => {
  try {
    console.log(req.body)
    const result = await Collab.findOne({_id: req.body.cid});
    result.tracks.push(req.body.url);
    const saveresult = await result.save()
    res.status(201).send(saveresult);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not get the Collab' });
  }
};

module.exports = { create, getAll, getUserCollabs, getCollab, saveTrack };
