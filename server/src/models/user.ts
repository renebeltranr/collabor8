"use strict";

import {IUser} from '../types/types'

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
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
      default: `./images/default.jpg`,
    },
    country: {
      type: String,
      required: true,
    },
    instruments: {
      type: Array,
      default: [],
    },
    owncollabs: {
      type: [{ type: Schema.Types.ObjectId, ref: "Collab" }],
      default: [],
    },
    othercollabs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
