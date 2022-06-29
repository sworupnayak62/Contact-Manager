const Contact = require("../models/Contact")
const joi = require("joi")

exports.SaveContact = async (req, res) => {
  const ContactsSchema = joi.object({
    UserId: joi.string().required(),
    ContactName: joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]+$")),
    ContactEmail: joi.string().email().required(),
    ContactNumber: joi.string().length(10).pattern(new RegExp("^[0-9]+$")),
    ContactType: joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]+$"))
  })

  try {
    const ContactData = await ContactsSchema.validateAsync(req.body)
    let contactEmail = await Contact.findOne({
      ContactEmail: ContactData.ContactEmail
    })
    let contactNum = await Contact.findOne({
      ContactNumber: ContactData.ContactNumber
    })
    if (!contactEmail && !contactNum) {
      const contact = new Contact(ContactData)
      await contact.save()
      res.status(201).json({
        message: "Contact saved successfully",
        ContactData: contact
      })
    } else if (contactEmail) {
      res.status(400).json({
        message: "Contact Email already exists",
        ContactData: contactEmail
      })
    } else {
      res.status(400).json({
        message: "Contact Number already exists",
        ContactData: contactNum
      })
    }
  } catch (err) {
    res.status(400).json({
      message: "Enter valid Input !! 1.Valid Name (No special characters) 2.Number length must be 10 3.Valid Email",
      error: err
    })
  }
}

exports.ContactList = async (req, res) => {
  try {
    let contact = await Contact.find({ UserId: req.params.UserId }).populate(
      "UserId"
    )

    if (!contact) {
      contact = []
    }
    res.status(200).json({
      message: "Contact fetched successfully",
      ContactData: contact
    })
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong !!",
      error: err
    })
  }
}

exports.DeleteContact = async (req, res) => {
  const id = req.params.id

  try {
    const deleteContact = await Contact.findByIdAndDelete(id)

    if (!deleteContact) {
      res.status(400).json({
        message: "Can't delete Contact not found/ID not found !!"
      })
    } else {
      res.status(200).json({
        message: "Contact deleted successfully"
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong !!",
      error: err
    })
  }
}

exports.UpdateContact = async (req, res) => {
  const id = req.params.id
  const ContactsSchema = joi.object({
    UserId: joi.string().required(),
    ContactName: joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]+$")),
    ContactEmail: joi.string().email().required(),
    ContactNumber: joi.string().length(10).pattern(new RegExp("^[0-9]+$")),
    ContactType: joi.string().pattern(new RegExp("^[a-zA-Z0-9 ]+$"))
  })
  try {
    const ContactData = await ContactsSchema.validateAsync(req.body)
    const updateContact = await Contact.findByIdAndUpdate(id, {
      $set: ContactData
    })

    if (!updateContact) {
      res.status(400).json({
        message: "Can't update Contact not found/ID not found !!"
      })
    } else {
      res.status(200).json({
        message: "Contact updated successfully",
        ContactData: updateContact
      })
    }
  } catch (err) {
    res.status(400).json({
      message: "Enter valid Input !! 1.Valid Name (No special characters) 2.Number length must be 10 3.Valid Email",
      error: err
    })
  }
}

exports.GetContactById = async (req, res) => {
  try {
    const id = req.params.id
    let contact = await Contact.findById(id)

    if (!contact) {
      contact = []
    }
    res.status(200).json({
      message: "Contact fetched successfully",
      ContactData: contact
    })
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong !!",
      error: err
    })
  }
}