const jwt = require("jsonwebtoken")
const secretKey = "contactManagerLtd-2021"
const auth = async (req, res, next) => {
  if (req.header("x-auth-token")) {
    token = req.header("x-auth-token")
    try {
      await jwt.verify(token, secretKey)
      next()
    } catch (err) {
      res.status(401).json({
        message: "Unauthorized Request !! Bad token"
      })
    }
  } else {
    res.status(401).json({
      message: "Unauthorized Request !! Token missing"
    })
  }
}

module.exports = auth
