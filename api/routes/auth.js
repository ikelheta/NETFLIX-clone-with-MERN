const router = require('express').Router();
const User = require('../model/user')
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken")

//register
router.post("/register", async (req, res)=>{
  const {username, password, email} = req.body
  const cryptoPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
  try {
    const user = await User.create({username, password:cryptoPassword, email})
    res.status(201).json(user) 
  } catch (error) {
    console.log(error)
  }
})

//login 
router.post("/login", async (req, res)=>{
  const { password, email} = req.body
 try {
  const user = await User.findOne({email})
  !user && res.status(401).json("wrong email")

  const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
  const originalPassword = decrypted.toString(CryptoJS.enc.Utf8)

  originalPassword !== password &&
   res.status(401).json("wrong password")

   // access token
   const accessToken = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn:"3d"})


  res.status(200).json({user, accessToken})
 } catch (error) {
   res.status(500).json({msg:"error"})
 }
  
})




module.exports = router

