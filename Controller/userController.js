    const { regisModel } = require("../Models/userModel");
const { hashPass, comparePassword } = require("../helper/bcrypt");
const path = require("path");
const jwt = require('jsonwebtoken');
const validator = require('validator')
require('dotenv').config()
const nodemailer = require('nodemailer')
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');



const registration = async  (req,res)=>{
    const {email,password} = req.body;
    if(!validator.isEmail(email)){return res.status(400).send({success:false,message:"Email Validation Failed"})}
    let fileLocation = path.join(__dirname,`../${req.file.destination + req.file.filename}`)
    let user = await regisModel.findOne({ email:email })
    if (user) {
      return res.status(409).send({ success: false, message: " Email is already exists" })}
   let hasspassword = await hashPass(password)

    const data = await regisModel.create({...req.body,password:hasspassword,profilepic:fileLocation });
    // console.log(data)
    const result = await data.save()
    res.status(201).send({success:true,message:"Registration is succesfully",data: result})
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await regisModel.findOne({ email:email });
    console.log(user)
        if (!user) {
            return res.status(401).send({ message: "invalid email"});
        }

        const matchedPassword = await comparePassword(password, user.password);

            if (!matchedPassword) {
              return res.status(409).send({ success: false, message: "wrong password" });
            }
          let token = jwt.sign({user:user},process.env.JWTKEY)
          await res.setHeader("token",token)
            res.status(200).send({ success: true, message: "Login Successfully", data: user, token:token })
          }


  //----------------forgot password --------------------
  const forgotPassword = async (req,res)=>{
    try{
      const {email} = req.body;
      const user = await regisModel.findOne(email)
      if(!user){
        return res.status(404).send({success:false,message:"user is not found"})
  }
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"sp8316886@gmail.com",
      pass:"xisr tvmf xeyz rswx",
    }
  });
  const mailOptions = {
    from:"sp8316886@gmail.com",
    to: req.body.email,
    subject: "hellow its me",
    text: "abcdefgh",
  };
  // console.log("hello")
  
  transporter.sendMail(mailOptions, async(err)=>{
    if(err){
      res.status(404).send({success:false,message:err.message})
    }
    else{
    res.status(200).send({success:true,message:"Email send"})
    
  }
})

} catch (error) {
  console.error(error.message);
  res.status(500).send({ success: false, message: "Internal Server Error" });
}
}



//--------------reset password------------------------
const resetPassword = async (req, res) => {

  try{
    let user = await regisModel.findOne({email:req.body.email})
    if(!user){
      return res.status(404).send({success:false,message:"Invalid email"})
    }
    if(req.body.newPassword != req.body.confirmPassword){
      return res.status(404).send({success:false,message:"Password not  matched"})
    }
    let newHashPassword = await hashPass(req.body.newPassword);
    
    let newdataUpdate = new regisModel(user)
     newdataUpdate.password=newHashPassword;
     newdataUpdate.save();
     res.status(201).send({success:true,message:"Reset password succesfully"})

  }
  catch(error){
    res.status(500).send({success:false,message:"server crashed",error:error.message})
  }
}


module.exports ={registration,login,forgotPassword,resetPassword}