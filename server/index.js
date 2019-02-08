const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001
const House = require('./../database/index.js')

app.use(express.static(__dirname + '/./../client/dist'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/houses/:id', (req, res) => {
  House.findAll(
    {where: {id: req.params.id}}
  ).then(data => {
    res.send(data)
  });
});
