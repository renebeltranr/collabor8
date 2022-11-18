"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CollabSchema = new Schema(
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

export default mongoose.model("Collab", CollabSchema);
