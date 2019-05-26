const mongoose = require("mongoose");
const mongoHost = `mongodb+srv://${process.env.DB_USER}:${
  process.env.DB_PWD
}@cluster0-rtry9.mongodb.net/test?retryWrites=true`;

const connection = mongoose
  .createConnection(mongoHost, {
    useNewUrlParser: true
  })
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

module.exports = connection;
