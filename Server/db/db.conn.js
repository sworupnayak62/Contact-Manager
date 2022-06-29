const config = require("./db.config");
const mongoose = require("mongoose");

const dbConn = async () => {
  try {
    await mongoose.connect(config.uri,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false},() => {
        console.log("Connected to the data base");
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = dbConn;
