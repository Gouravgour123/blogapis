const { default: mongoose } = require("mongoose");

const regisSchema =new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  city:{
    type:String,
    require:true
  },
  state:{
    type:String,
    require:true
  },
  profilepic:{
    type:String
},
},{timestamps:true})

const regisModel = mongoose.model("user",regisSchema)

module.exports = {regisModel}