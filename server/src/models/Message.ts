import mongoose from "mongoose";

export interface IMessage extends mongoose.Document {
  sender: mongoose.Types.ObjectId;
  receiver?: mongoose.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IMessage>("Message", MessageSchema);
