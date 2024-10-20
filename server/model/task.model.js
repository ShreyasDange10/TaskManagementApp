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
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    status:{
        type: String,
        default:"pending"
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

export default mongoose.model("task", taskSchema);