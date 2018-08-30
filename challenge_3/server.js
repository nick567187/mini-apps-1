var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.post('/form1', function(req,res) {
  console.log(req.body)
  var Name = req.body.Name
  var Email = req.body.Email
  var Password = req.body.Password
  // db.query('INSERT INTO shop () ')
});


app.post('/form2', function(req,res) {
  var address1 = req.body['Address Line 1']
  var address2 = req.body['Address Line 2']
  var City = req.body.City
  var State = req.body.State
  var zip = req.body['Zip Code']
  var phone = req.body['Phone Number']
  // db.query('INSERT INTO shop () ')
});

app.post('/form3', function(req,res) {
  var credit = req.body['Credit Card'];
  var expiry = req.body['Expiry Date'];
  var cvv = req.body['CVV'];
  var billingzip = req.body['Billing Zip Code'];
  // db.query('INSERT INTO shop () ')
});

app.listen(3000, () => console.log('You are listening on port 3000'));



var db = mysql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'shop'
});

db.connect(function(err) {
  if(err) {
    throw err;
  }
  console.log('You are now connected to the database');
})

// db.query('CREATE TABLE 'Name: null,
//       Email: null,
//       Password: null,
//       'Address Line 1': null,
//       'Address Line 2': null,
//       City: null,
//       State: null,
//       'Zip Code': null,
//       'Phone Number': null,
//       'Credit Card': null,
//       'Expiry Date': null,
//       CVV: null,
//       'Billing Zip Code': null')

