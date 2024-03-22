const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/cdgi")
.then(()=>{console.log("connect");}).catch(()=>{console.log("not connect");})
