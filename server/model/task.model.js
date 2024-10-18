import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
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
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

export default mongoose.model("todo", taskSchema);