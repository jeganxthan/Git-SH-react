import mongoose,{Document, Schema} from "mongoose";
export interface IMessage extends Document{
    sender:mongoose.Types.ObjectId;
    receiver:mongoose.Types.ObjectId;
    text:string;
    createdAt:Date;
}

const messageSchema = new Schema<IMessage>(
    {
        sender:{type:Schema.Types.ObjectId, ref:"User", required:true},
        receiver:{type:Schema.Types.ObjectId, ref:"User", required:true},
        text:{type:String, required:true}
    },
    {timestamps:{createdAt: true, updatedAt:true}}
)

export default mongoose.model<IMessage>("Message", messageSchema);