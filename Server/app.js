const express = require("express")
const app = express()
const dbConn = require("./db/db.conn")
const cors = require("cors")

dbConn()
app.use(express.json())

const port = process.env.PORT || 3000

const corsOption={
  "origin":"*"
}
app.use(cors(corsOption))

const contactRoute = require("./api/ver1/routes/Contacts")
app.use("/api/Contacts", contactRoute)

const userRoute = require("./api/ver1/routes/Users")
app.use("/api/Users", userRoute)

app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
