const Collab = require('./../models/collab');

const create = async (req, res) => {
  try {
    console.log("BODY: ",req.body)
    console.log("req.user", req.user)
    const newCollab = new Collab({
      owner: req.user.username,
      name: req.body.name,
    });
    const cb = await newCollab.save();
    //const add = await 
    res.status(201).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create Collab' });
  }
};

const getAll = async (req, res) => {
  try {
    const cb = await Collab.find();
    res.status(201).send(cb);
  } catch (error) {
    console.log(error)
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

module.exports = { create, getAll };
