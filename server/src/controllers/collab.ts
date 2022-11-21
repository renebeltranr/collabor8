import { Request, Response } from "express";
import Collab from "../models/collab";
import User from "../models/user";
import { ICollab, IUser } from "../types/types";

const create = async (req: Request, res: Response) => {
  try {
    const newCollab = new Collab({
      owner: req.session.uid,
      name: req.body.name,
      tracks: req.body.tracks,
    });
    const cb = await newCollab.save();
    const user = await User.findById(req.session.uid) as any;
    user.owncollabs.push(cb._id);
    const result= await user.save() as any;
    res.set({'Access-Control-Allow-Origin':'http://localhost:3000', 'Access-Control-Allow-Credentials':true, 'Access-Control-Allow-Headers': 'Accept'}).status(201).send(cb);
  } catch (error) {
    console.log('Controller Create error:', error);
    res.status(400).send({ error, message: "Could not create Collab" });
  }
};

const handleOptions =async (req:Request, res: Response) => {
  try {
    res.set('Access-Control-Allow-Origin','http://localhost:3000').set('Access-Control-Allow-Credentials','http://localhost:3000').status(201).send({msg: 'Allow cors'});
  } catch (error) {
    console.log('Controller handleOptions error:', error);
    
  }
}

const getAll = async (req: Request, res: Response) => {
  try {
    const cb = await Collab.find().sort({ createdAt: -1 }).populate("owner");
    res.status(200).send(cb);
  } catch (error) {
    console.log('Controller getAll error:', error);
    res.status(400).send({ error, message: "Could not get all Collabs" });
  }
};

const getUserCollabs = async (req: Request, res: Response) => {
  try {
    const uid = req.params.id;
    const cb = await Collab.find({ owner: uid });
    res.status(200).send(cb);
  } catch (error) {
    console.log('Controller getUserCollabs error:',error);
    res.status(400).send({ error, message: "Could not get user Collabs" });
  }
};

const getCollab = async (req:Request, res: Response) => {
  try {
    const cid = req.params;
    const cb = await Collab.find({ _id: cid.id }).populate("owner");
    const ownerUser = await User.findOne({ username: cb[0].owner }) as any;
    ownerUser.password = undefined as any;
    res.status(200).send(cb);
  } catch (error) {
    console.log('Controller getCollab error:', error);
    res.status(400).send({ error, message: "Could not get the Collab" });
  }
};

const saveTrack = async (req: Request, res: Response) => {
  try {
    
    const result: any = await Collab.findOne({ _id: req.body.cid });
        
    if (result.owner.valueOf() === req.session.uid) {
      result.tracks.push({
        url: req.body.url,
        owner: req.session.uid,
        volume: 100,
        username: req.body.username,
      });

      const saveresult = await result.save();
      
      res.status(201).send(saveresult);
    } else {
      result.pendingtracks.push({
        url: req.body.url,
        owner: req.session.uid,
        volume: 100,
        username: req.body.username,
      });
      const saveresult = await result.save();
      res.status(201).send(saveresult);
    }
  } catch (error) {
    console.log('Controller saveTrack error:',error);
    res.status(400).send({ error, message: "Could not save the Collab" });
  }
};

const saveSettings = async (req: Request, res: Response) => {
  try {
    const result = new Collab(await Collab.findOne({ _id: req.params.id }));
    if (result.owner.valueOf() === req.session.uid) {
      result.tracks = req.body.tracks;
      const saveresult = await result.save();
      res.status(201).send(saveresult);
    }
  } catch (error) {
    console.log('Controller saveSettings error:', error);
    res.status(400).send({ error, message: "Could not save the settings" });
  }
};

const acceptTrack = async (req: Request, res: Response) => {
  try {
    const result = new Collab(await Collab.findOne({ _id: req.params.id }));
    if (result.owner.valueOf() === req.session.uid) {
      let trackToDelete: string;
      result.pendingtracks.forEach((el: any) => {
        if (el.url === req.body.url) {
          result.tracks.push(el);
          trackToDelete = el;
        }
      });
      result.pendingtracks = result.pendingtracks.filter(
        (el: any) => el != trackToDelete
      );
      const savedResult = await result.save();
      res.status(201).send(savedResult);
    } else {
    }
  } catch (error) {
    console.log('Controller acceptTrack error:', error);
    res.status(400).send({ error, message: "Could not accept the track" });
  }
};

const denyTrack = async (req: Request, res: Response) => {
  try {
    const result = new Collab(await Collab.findOne({ _id: req.params.id }));
    if (result.owner.valueOf() === req.session.uid) {
      let trackToDelete: string;
      result.pendingtracks.forEach((el: any) => {
        if (el.url === req.body.url) {
          trackToDelete = el;
        }
      });
      result.pendingtracks = result.pendingtracks.filter(
        (el: any) => el != trackToDelete
      );
      const savedResult = await result.save();
      res.status(201).send(savedResult);
    } else {
    }
  } catch (error) {
    console.log('Controller denyTrack error:', error);
    res.status(400).send({ error, message: "Could not delete the track" });
  }
};

const deleteTrack = async (req: Request, res: Response) => {
  try {
    const result = new Collab(await Collab.findOne({ _id: req.params.id }));
    if (result.owner.valueOf() === req.session.uid) {
      let trackToDelete: string;
      result.tracks.forEach((el:any) => {
        if (el.url === req.body.url) {
          trackToDelete = el;
        }
      });
      result.tracks = result.tracks.filter((el:any) => el != trackToDelete);
      const savedResult = await result.save();
      res.status(201).send(savedResult);
    } else {
    }
  } catch (error) {
    console.log('Controller deleteTrack error:', error);
    res.status(400).send({ error, message: "Could not delete the track" });
  }
};

const deleteCollab = async (req: Request, res: Response) => {
  try {
    if (req.body.uid === req.session.uid) {
      const result = await Collab.deleteOne({ _id: req.params.cid });
      if (result.deletedCount === 1) {
        const result2 = await User.update(
          { _id: req.body.uid },
          { $pull: { owncollabs: req.params.cid } }
        );
        if (result2.modifiedCount === 1)
          console.log("Collab successfully deleted");
      }
    } else {
      throw new Error("Not authorized");
    }
    res.sendStatus(201);
  } catch (error) {
    console.log('Controller deleteCollab error:', error);
    res.status(400).send({ error, message: "Could not delete the Collab" });
  }
};

export default {
  create,
  getAll,
  getUserCollabs,
  getCollab,
  deleteCollab,
  saveTrack,
  acceptTrack,
  denyTrack,
  deleteTrack,
  saveSettings,
  handleOptions
};
