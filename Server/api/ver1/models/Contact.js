const mongoose = require("mongoose")

const ContactSchema = mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  ContactName: {
    type: String,
    required: true
  },
  ContactEmail: {
    type: String,
    required: true
  },
  ContactNumber: {
    type: String,
    required: true
  },
  ContactType: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("contacts", ContactSchema)
