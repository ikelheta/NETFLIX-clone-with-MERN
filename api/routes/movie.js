const Movie = require("../model/Movie")
const verify = require("../verify")
const router = require("express").Router()

//create a new movie

router.post("/add/", verify, async (req, res)=>{
    if(req.user.isAdmin){
      try {
        const movie = await Movie.create(req.body)
        res.status(201).json(movie)
      } catch (error) {
        res.status(500).json(error)
      }  
    }else{
      res.status(401).json({msg: "only admin can upload movies"})
    }
})

// update the movie
router.put("/update/:id",verify , async(req, res) => {
    if(req.user.isAdmin){
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {$set : req.body}, {new:true})
        res.status(200).json(updatedMovie)
      } catch (error) {
        res.status(500).json({msg: error.message})
      }
    }else{
      res.status(401).json({msg: "only admin can update movies"})
    }
})

// delete movies
router.delete("/delete/:id", verify , async (req, res)=>{
  if(req.user.isAdmin){
    try {
      await Movie.findByIdAndDelete(req.params.id)
      res.status(200).json({msg: "movie deleted successfully"})
    } catch (error) {
      ers.status(500).json(error)
    }
  }else{
    res.status(401).json("only admins can delete movies")
  }
})

//get movie 
router.get("/find/:id", verify, async(req, res)=>{
    try {
      const movie = await Movie.findById(req.params.id)
      res.status(200).json(movie)
    } catch (error) {
      res.status(500).json("error")
    }
})

//GET RANDOM

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/all", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router