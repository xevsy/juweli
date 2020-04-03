const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  const host = req.header("host");
  console.log(host)
  if (!host.match(/^www\..*/i)) {
    res.redirect(301, "https://www." + host);
  }
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`)
  else
    next()
})

app.use(express.static(publicPath));

// app.post("/api/send_email", function(req, res) {
//   res.set("Content-Type", "application/json");
//
//   var person = {
//     name : "Jenny",
//     email: "ievgen.syrotiuk@gmail.com",
//     subject:"Welcome to DWYL :)"
//   }
//   /* Send email here */
//   email('order', person, function(error, result){
//     console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
//     console.log(error);
//     console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
//   })
//
//   res.send('{"message":"Email sent."}');
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log('Server is up!');
});
