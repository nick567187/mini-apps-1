var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var last = 0;
app.post('/form1', function(req,res) {
  console.log(req.body)
  var Name = req.body.Name
  var Email = req.body.Email
  var Password = req.body.Password
  db.query(`INSERT INTO shop (Name, Email, Password) VALUES ('${Name}', '${Email}', '${Password}')`, (err, result) => {
    if(err) {
      console.log(err);
    } 
    last = result.insertId;
  });
});

app.post('/form2', function(req,res) {
  var address1 = req.body['Address Line 1']
  var address2 = req.body['Address Line 2']
  var City = req.body.City
  var State = req.body.State
  var zip = req.body['Zip Code']
  var phone = req.body['Phone Number']
  db.query(`UPDATE shop SET AddressLine1 = '${address1}', AddressLine2 = '${address2}', City = '${City}', State = '${State}', ZipCode = '${zip}', PhoneNumber = '${phone}' WHERE id= ${last}`, (err, result) => {
    if(err) {
      console.log(err);
    } 
    console.log(result);
  });
});

app.post('/form3', function(req,res) {
  var credit = req.body['Credit Card'];
  var expiry = req.body['Expiry Date'];
  var cvv = req.body['CVV'];
  var billingzip = req.body['Billing Zip Code'];
  db.query(`UPDATE shop SET CreditCard = '${credit}', ExpiryDate = '${expiry}', CVV = '${cvv}', BillingZipCode = '${billingzip}' WHERE id= ${last}`, (err, result) => {
    if(err) {
      console.log(err);
    } 
    console.log(result);
  });
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

db.query("CREATE TABLE IF NOT EXISTS shop ( id INT auto_increment, Name VARCHAR(30), Email VARCHAR(40), Password VARCHAR(30), AddressLine1 VARCHAR(40), AddressLine2 VARCHAR(40), City VARCHAR(20), State VARCHAR(20), ZipCode VARCHAR(13), PhoneNumber VARCHAR(20), CreditCard VARCHAR(25), ExpiryDate VARCHAR(10), CVV VARCHAR(10), BillingZipCode VARCHAR(10), PRIMARY KEY (id))", function(err, result) {
  if(err) { throw err; }
  console.log(result);
});

