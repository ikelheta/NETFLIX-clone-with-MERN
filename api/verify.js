const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    !req.headers.token && res.status(401).json({msg: "please login first"})
    const token = req.headers.token.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if(err) res.status(403).json({err:err.message})
      else{
        req.user = data
        next()
      }
    })
}
module.exports = verify