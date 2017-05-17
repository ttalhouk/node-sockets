const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000; // required for heroku deployment

var app = express();

app.use(express.static(publicPath));

// app.get('/', (req,res) => {
//   res.sendFile(publicPath + '/index.html');
// })

app.listen(port, () =>{
  console.log('Server running on port '+port);
});
