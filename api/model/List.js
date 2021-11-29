const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  tittle : {type: String},
  type : {type: String, required: true,unique: true},
  genre : {type: String, required: true}, 
  content : {type: Array, required: true}

}, {timestamps : true})

module.exports = mongoose.model("List", ListSchema)