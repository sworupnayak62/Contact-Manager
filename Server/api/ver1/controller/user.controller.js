const User = require("../models/User")
const joi = require("joi")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const secretKey = "contactManagerLtd-2021"

exports.SignUp = async (req, res) => {
  const UsersSchema = joi.object({
    UserFullName: joi.string().min(5).pattern(new RegExp("^[a-zA-Z ]+$")),
    UserEmail: joi.string().email().required(),
    UserPassword: joi.string().min(6).max(10)
  })

  try {
    const UserData = await UsersSchema.validateAsync(req.body)
    let user = await User.findOne({ UserEmail: UserData.UserEmail })
    if (!user) {
      user = new User(UserData)
      const salt = await bcrypt.genSalt(10)
      user.UserPassword = await bcrypt.hash(user.UserPassword, salt)
      await user.save()
      res.status(200).json({
        message: "User registered successfully",
        UserData: user
      })
    } else {
      res.status(400).json({
        message: "User already exists"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "Enter valid input !! 1.Name more than five characters (No special characters and numbers allowed) 2.Valid Email 3.Password more than 6 characters and less than 10 characters",
      error: err
    })
  }
}

exports.LogIn = async (req, res) => {
  const LoginSchema = joi.object({
    UserEmail: joi.string().required(),
    UserPassword: joi.string().required()
  })

  try {
    const LoginData = await LoginSchema.validateAsync(req.body)
    let user = await User.findOne({ UserEmail: LoginData.UserEmail })

    if (!user) {
      res.status(400).json({
        message: "Username/Password doesn't exist"
      })
    } else {
      const is_match = await bcrypt.compare(
        LoginData.UserPassword,
        user.UserPassword
      )
      if (!is_match) {
        res.status(400).json({
          message: "Username/Password doesn't exist"
        })
      } else {
        const payload = {
          userData: {
            id: user._id
          }
        }
        const token = await jwt.sign(payload, secretKey, { expiresIn: 7200 })
        res.status(200).json({
          message: "Logged In",
          user: { id: user._id, name: user.UserFullName },
          token
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err
    })
  }
}
