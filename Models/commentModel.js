const { default: mongoose } = require("mongoose");

const commentSchema =  new mongoose.Schema({
    comment:{
        type:String,
        require:true
    },
    userId:{ 
        type:mongoose.Types.ObjectId,
        ref:'userModel',
        require:true
    },
    blogId:{
        type:mongoose.Types.ObjectId,
        ref:'blogModel',
        require:true
    },
    isActive:{
        type:Boolean,
        require:true
    }
},{timestamps:true});


const commentmodel = mongoose.model("comment",commentSchema)

module.exports = {commentmodel}