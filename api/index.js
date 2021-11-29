//express server
const express = require('express');
const app = express();
require("dotenv").config()
app.use(express.json())
//cors
const cors = require('cors')
app.use(cors())
//mongoose
const mongoose = require('mongoose');
const connectDB = require("./db/connect")
//routers
const aouthRouter = require("./routes/auth")
const userRouter = require("./routes/User")
const movieRouter = require("./routes/movie")
const listRouter = require("./routes/List")
app.use("/", aouthRouter)
app.use("/user/", userRouter)
app.use("/movies/", movieRouter)
app.use("/list/", listRouter)










const port = process.env.PORT || 5000
const start =  () =>{
  connectDB(process.env.MONGO_URI, console.log("connected to db"))
  app.listen(port, ()=>{console.log(`server is runing on port ${port}...`);}) 
}
start()