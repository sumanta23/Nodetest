var express    = require('express');
var app        = express();
var loki       = require('lokijs');
var bodyParser = require('body-parser');
var uuid       = require("node-uuid");
var db         = new loki('loki.json');
var children   = db.addCollection('children');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 1234));

app.post('/', function(request, response) {
    var id = uuid.v1();
    children.insert({id: id, name:request.body}); 
    response.send(id);
});

app.get('/', function(request, response) {
    var y = children.find({id: request.query.id}); 
    response.send(y[0].name);
});


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
