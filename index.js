var express = require('express');
var app = express();
var loki = require('lokijs');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var db = new loki('loki.json');
var children = db.addCollection('children');

app.set('port', (process.env.PORT || 3000));

app.post('/', function(request, response) {
    console.log(request.body);
  children.insert({name:request.body}); 
  response.send('Hello World!');
});

app.get('/', function(request, response) {
  var y = children.get(1); 
  console.log(y);
  response.send(y);
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

