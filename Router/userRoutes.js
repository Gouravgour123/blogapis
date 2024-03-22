const express = require('express');
const { registration, login, resetPassword, forgotPassword } = require('../Controller/userController');
const { upload } = require('../helper/multer');
const userRouter = express.Router();
    



userRouter.post('/registration',upload.single("profilepic"), registration);
userRouter.post('/login', login);
userRouter.post('/reset', resetPassword);
userRouter.post('/forget', forgotPassword);
// userRouter.post('/forget', forgotPassword);



module.exports= {userRouter}