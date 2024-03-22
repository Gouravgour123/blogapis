const { default: mongoose } = require("mongoose");

const blogSchema =new mongoose.Schema({
  bid:
  {
   type:Number,
   require:true
  },
  title:
  {
    type:String,
    require:true
  },
  description:
  {
    type:String,
    require:true
  },
  category:{
   type:String,
   require:true
  },
  
  likes:{
    type:Array,
    default:[]
},

  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      text: String
    },
  ],
  blogpic:
  {
    type:String
  },
 
  userId:{
    type:mongoose.Types.ObjectId,
    ref:"regisModel",
},   
},{timestamps:true});

const  blogmodel = mongoose.model("vlog",blogSchema)
module.exports = {blogmodel}