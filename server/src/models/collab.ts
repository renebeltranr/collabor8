"use strict";

import mongoose from "mongoose";
import { ICollab } from "../types/types";
const Schema = mongoose.Schema;
const CollabSchema = new Schema<ICollab>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    },
    pendingtracks: {
      type: Array,
      default: [],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICollab>("Collab", CollabSchema);
