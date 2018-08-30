var express = require('express');
var bodyParser = require('body-parser');

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));






app.listen(3000, () => console.log("Successfully connected to server"));
