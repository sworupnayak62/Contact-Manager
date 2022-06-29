const express = require("express")
const contactController = require("../controller/contact.controller")
const auth = require("../middleware/auth")
const multer = require("multer")
const router = express.Router()

const Upload = multer({ dest: "Uploads/" })

router.post("/save", auth, contactController.SaveContact)

router.get("/:UserId", auth, contactController.ContactList)

router.delete("/Delete/:id", auth, contactController.DeleteContact)

router.put("/Update/:id", auth, contactController.UpdateContact)

router.get("/Get/:id", auth, contactController.GetContactById)

router.post("/Upload", Upload.single("imagefile"), (req, res) => {
  res.status(200).json({
    details: req.file
  })
})

module.exports = router
