const bcrypt = require("bcrypt")

let hashPass  = async(simplepassword)=>{
    let saltRound = 10;
    let hasspassword = await bcrypt.hash(simplepassword,saltRound)
    return hasspassword;
    }
    let comparePassword = async (simplepassword,hasspassword)=>{
        let compared = await bcrypt.compare(simplepassword,hasspassword)
        return compared;
    }
    module.exports = {hashPass,comparePassword}