var express = require('express');    //Express Web Server
var app = express();

var server = app.listen(8080, function() {
	console.log('Listening on port %d', server.address().port);
});

app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/servertime', function(req, res){
    res.send((new Date()).toString());
});
var i=0;

app.get('/counter', function(req, res){
	i++;
  res.send("you are the " + i + "th visitor.");
});

var vname="no name is set yet.";

app.get('/name/:input', function (req, res) {
  vname = req.params.input;
	res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify({name:vname}));
})

app.get('/name/:firstName/:lastName', function (req, res) {
  vname = req.params.firstName + " "+ req.params.lastName;
	res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify({name:vname}));
})

app.get('/name', function(req, res){
	console.log("GET name")
	res.writeHead(200, {'Content-type': 'application/json'});
  res.end(JSON.stringify({name:vname}));
});

app.post('/name', function(req, res){
	var jsonString = '';
  req.on('data', function (data) {
      jsonString += data;
  });
  req.on('end', function () {
      vname = JSON.parse(jsonString).name;
			console.log("POST: /name", vname);
			res.writeHead(200, {'Content-type': 'application/json'});
		  res.end(JSON.stringify({status:"name succesfully set",data:vname}));
  });
});

var absolutePath = "/Users/sangwonlee/Box Sync/Workspace/gitub_workspace/node-simple"

app.use(express.static( absolutePath +'/public/'));
