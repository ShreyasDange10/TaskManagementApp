import mongoose from 'mongoose';

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type : String,
        rquired: true
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isDeleted:{
        type: Boolean,
        default:false
    }
},{
    timestamps: true
});

export default mongoose.model('category', categorySchema);