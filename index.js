const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 5000
const parser = require('body-parser');
const uri = 'mongodb://heroku_9d4txdmb:ol8lo56i5qd1u3ro3ubi7e3tug@ds163650.mlab.com:63650/heroku_9d4txdmb';


mongoose.Promise = global.Promise;
mongoose.connect(uri);

var hackerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})
var User = mongoose.model("Participants", hackerSchema);

var app = express();
app.use('/', (req, res) => {
  res.sendFile(__dirname + "/form.html");
});
app.post('/add', (req, res) => {
  var data = new User(req.body);
  data.save()
    .then(item => {
      res.send("Saved to database");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
})
app.listen(PORT, () => {
  console.log("Server listening on port " + port);
});

