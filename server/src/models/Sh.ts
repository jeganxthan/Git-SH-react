import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IUser } from "./User";

// Comment interface (plain, no Document)
export interface IComment {
  user: Types.ObjectId | IUser;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// SH interface
export interface ISH extends Document {
  user: Types.ObjectId | IUser;
  sh: string;
  likes: Types.ObjectId[];
  comments: mongoose.Types.DocumentArray<IComment>; // DocumentArray for subdocs
  createdAt?: Date;
  updatedAt?: Date;
}

// Comment schema
const commentSchema = new Schema<IComment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// SH schema
const ShSchema = new Schema<ISH>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sh: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

const SH: Model<ISH> = mongoose.model<ISH>("SH", ShSchema);

export default SH;
