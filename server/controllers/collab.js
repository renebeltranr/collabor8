const Collab = require('./../models/collab');
const User = require('./../models/user');

const create = async (req, res) => {
  try {
    const newCollab = new Collab({
      owner: req.session.uid,
      name: req.body.name,
      tracks: req.body.tracks
    });
    const cb = await newCollab.save();
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
    const result = await Collab.findOne({_id: req.body.cid});
    result.tracks.push(req.body.url);
    const saveresult = await result.save()
    res.status(201).send(saveresult);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not get the Collab' });
  }
};

const deleteCollab = async (req, res) => {
  try {
    if(req.body.uid === req.session.uid) {
      const result = await Collab.deleteOne({_id: req.params.cid});
      if (result.deletedCount === 1){
        const result2 = await User.update( { _id: req.body.uid }, 
          { $pull: { owncollabs: req.params.cid } } )
          if (result2.modifiedCount === 1) console.log('Collab successfully deleted');
      }
    } else {
      throw new Error ("Not authorized")
    }
    res.sendStatus(201);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not delete the Collab' });
  }
};

module.exports = { create, getAll, getUserCollabs, getCollab, deleteCollab, saveTrack };
