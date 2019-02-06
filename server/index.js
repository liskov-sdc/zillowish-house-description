const express = require('express');
const app = express();
const port = 3001
const House = require('./../database/index.js')

app.use(express.static(__dirname + '/./../client/dist'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/houses', (req, res) => {
  House.findAll().then(data => {
    res.send(data)
  });
});
