const router = require("express").Router()
const User = require("../model/user")
const CryptoJS = require('crypto-js');
const verify = require("../verify")



//update
router.put("/:id", verify, async(req, res) => {
if(req.user.id === req.params.id || req.user.isAdmin){
  if(req.body.password){
  rec.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();}

try {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new: true})

  res.status(200).json({updatedUser})
} catch (error) {
  res.status(500).json({message: error.message});
  
}
  
}else{
  res.status(403).json("you can only update your data")
}


})
//delete 

router.delete("/:id", verify, async(req, res) => {
  if(req.user.id === req.params.id || req.user.isAdmin){
    if(req.body.password){
    rec.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();}
  
  try {
    await User.findByIdAndDelete({_id: req.user.id})
  
    res.status(200).json({msg: "deleted successfully"})
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
    
  }else{
    res.status(403).json("you can only delete your data")
  }
  
  
  })
//get 
router.get("/find/:id", verify, async(req, res) => {
  if(req.user.id === req.params.id || req.user.isAdmin){
    if(req.body.password){
    rec.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();}
  
  try {
    const user = await User.findById(req.user.id)
  
    res.status(200).json({user})
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
    
  }else{
    res.status(403).json("you can only delete your data")
  }
  
  
  })
//getall
router.get("/allusers", verify, async(req, res) => {
  if(req.user.isAdmin){
    if(req.body.password){
    rec.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();}
  try {
  const query = req.query.new
  const users = query ? await User.find().sort({_id : -1}).limit(3) : await User.find() 
    res.status(200).json({users})
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
    
  }else{
    res.status(403).json("only admins can get all users")
  }
  
  
  })
//getuser stats
module.exports = router