const router = require("express").Router();
const List = require("../model/List");
const verify = require("../verify");

//CREATE

router.post("/add", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been delete...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/", verify, async (req, res) => {
  const {type, genre} = req.query
  let list = [];
  console.log(req.query)
  try {
    if (type) {
      if (genre) {
        list = await List.aggregate([  
          { $sample: { size: 1 } },  
          { $match: { type, genre} },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 1 } },
          { $match: { type } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 2 } }]);
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;