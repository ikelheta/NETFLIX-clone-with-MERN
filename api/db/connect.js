const mongoose = require('mongoose');

const connectDB = async (url)=>{
  try{
    await mongoose.connect(url)
  }
  catch(err){
    console.error(err)
  }
}

module.exports = connectDB;