const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    tittle : {type: String, required: true, unique: true},
    desc : {type: String, },
    image:{type: String, },
    imageTittle : {type: String,},
    imagesm : {type: String, },
    trailer:{type: String,},
    video:{type: String,},
    limit:{type: Number, default: 0},
    year : {type: Number},
    isSeries : {type: Boolean, default: false},
    genre: {type: String, required: true,},
}, {timestamps: true})

module.exports = mongoose.model('Movie',MovieSchema);