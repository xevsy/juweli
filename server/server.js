const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;

const { email, set_template_directory } = require('sendemail')
set_template_directory('./templates')

app.use(express.static(publicPath));

app.post("/api/send_email", function(req, res) {
  res.set("Content-Type", "application/json");

  var person = {
    name : "Jenny",
    email: "ievgen.syrotiuk@gmail.com",
    subject:"Welcome to DWYL :)"
  }
  /* Send email here */
  email('order', person, function(error, result){
    console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
    console.log(result);
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
  })

  res.send('{"message":"Email sent."}');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log('Server is up!');
});
