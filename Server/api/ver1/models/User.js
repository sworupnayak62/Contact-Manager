const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  UserFullName: {
    type: String,
    required: true
  },
  UserEmail: {
    type: String,
    required: true
  },
  UserPassword: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("users", UserSchema)
