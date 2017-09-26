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
var CircularJSON = require('circular-json');
var jsBeautify = require('js-beautify');
var port = 8000;


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/intercept', function(req, res) 
{
	if (req.body.type === 'YAMLText') {
		nativeObject = YAML.parse(req.body.yamlString);
		//res.send({output:nativeObject});
		SwaggerParser.bundle(nativeObject).then(function(api) {
			//console.log("Intercepting Swagger to JSON bundle", api);
			res.send({output:api});
		});
	} else {
		SwaggerParser.bundle(req.body.filename).then(function(api) {
			//console.log("Intercepting Swagger to JSON bundle", api);
			res.send({output:api});
		});
	}
});

app.post('/parse', function(req, res) 
{
	if (req.body.type === 'YAMLText') {
		nativeObject = YAML.parse(req.body.yamlString);
		//res.send({output:nativeObject});
		SwaggerParser.parse(nativeObject).then(function(api) {
			//console.log("Intercepting Swagger to JSON bundle", api);
			res.send({output:api});
		});
	} else {
		SwaggerParser.parse(req.body.filename).then(function(data) {
			//console.log("Parsed swagger : ", data);
			res.send({output:data});
		});
	}
});

app.post('/dereference', function(req, res) 
{
	if (req.body.type === 'YAMLText') {
		nativeObject = YAML.parse(req.body.yamlString);
		//res.send({output:nativeObject});
		SwaggerParser.dereference(nativeObject).then(function(api) {
			//console.log("Intercepting Swagger to JSON bundle", api);
			res.send({output:api});
		});
	} else {
		SwaggerParser.dereference(req.body.filename).then(function(data) {
		//console.log("Dereferenced swagger : ", data);
		res.send({output:data});
		});
	}
});

app.post('/resolve', function(req, res) 
{
	if (req.body.type === 'YAMLText') {
		nativeObject = YAML.parse(req.body.yamlString);
		//res.send({output:nativeObject});
		SwaggerParser.resolve(nativeObject).then(function(data) {
			var serialized = CircularJSON.stringify(data);
			//console.log("Resolved swagger : ", data, serialized);
			res.send(jsBeautify.js_beautify(serialized));
		});
	} else {
		SwaggerParser.resolve(req.body.filename).then(function(data) {
			var serialized = CircularJSON.stringify(data);
			//console.log("Resolved swagger : ", data, serialized);
			res.send(jsBeautify.js_beautify(serialized));
		});
	}
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