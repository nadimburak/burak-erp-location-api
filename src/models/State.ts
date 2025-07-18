import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for State Document
export interface IState extends Document {
  country: mongoose.Types.ObjectId; // Reference to Country model
  name: string;
  state_code: string;
  type: string;
  latitude: string;
  longitude: string;
  description: string;
  status: boolean; // true or false
  created_at: Date;
  updated_at: Date;
}

// Schema Definition
const StateSchema: Schema<IState> = new Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    state_code: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Mongoose will manage timestamps
  }
);

// Model Definition
const State: Model<IState> = mongoose.model<IState>(
  "State",
  StateSchema
);

export default State;
