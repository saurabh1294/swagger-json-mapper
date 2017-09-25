/*
	*File: app.js
	*Author: Saurabh Gattani
	*Last Modified: 25th September 2017
	*Revised on: 25th September 2017
*/


var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var SwaggerParser = require('swagger-parser');
var YAML = require('yamljs');
var port=8000;




app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/intercept', function(req, res) 
{
	SwaggerParser.bundle(req.body.filename).then(function(api) {
		//console.log("API", api);
		res.send({output:api});
	});
});

app.post('/YAMLToJSONObject', function(req, res) 
{
	// parse YAML string
	//console.log("YAML = ", req.body.yamlString, typeof req.body.yamlString);
	nativeObject = YAML.parse(req.body.yamlString);
	res.send({output:nativeObject});
});



app.get('/', function(req, res) 
{
    res.sendfile("./index.html");
});

console.log("Listening at "+port)
app.listen(port);