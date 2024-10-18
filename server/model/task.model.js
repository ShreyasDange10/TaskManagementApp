import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    }
});

export default mongoose.model("todo", todoSchema);