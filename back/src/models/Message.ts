import mongoose, { mongo } from "mongoose"

const messageSchema = new mongoose.Schema({
    channelId : {type: mongoose.Schema.Types.ObjectId, ref:"Channel"},
    userId : {type:mongoose.Schema.Types.ObjectId, ref : "User"},
    text: String,
    createdAt: { type: Date, default : Date.now}
});
    
export default mongoose.model("Message", messageSchema)