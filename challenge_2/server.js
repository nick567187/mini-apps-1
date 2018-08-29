const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.post('/', (req,res) => {
  var result = JSON.parse(req.body.result);
  var result2 = generateCV(result);
  fs.writeFile('./samples/csv_report.csv', result2, (err) => {
    if(err) { console.log(err) };
    res.send(result2);
  });
});

var generateCV = function(data) {
  var firstLine = [];
  var results;
  for(var key in data) { 
    if(key !== 'children') {
      firstLine.push(key); 
    }
  };
  firstLine = firstLine.join(',');
  results = firstLine;

  var recursiveHelper = function(next) {
    var curr = next;
    var nextLine = [];
    for(var key in curr) {
      if(key !== 'children') {
        nextLine.push(curr[key]);
      }
    }
    firstLine = firstLine.concat('\n', nextLine);
    results = results.concat('\n', nextLine);
    for(var i = 0; i < curr.children.length; i++) {
      recursiveHelper(curr.children[i]);
    }
  }

  recursiveHelper(data);
  return results;
}

app.listen(3000, () => console.log('I am listening on port 3000'));