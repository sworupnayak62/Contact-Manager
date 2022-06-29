const express = require("express")
const userController = require("../controller/user.controller")

const router = express.Router()

router.post("/Signup", userController.SignUp)

router.post("/Login", userController.LogIn)

module.exports = router
