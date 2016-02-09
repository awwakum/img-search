var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var path = require('path');
var credentials = require('./credentials');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://' + credentials.user + ':' + credentials.pass + '@ds055915.mongolab.com:55915/img-search');
var urlSchema = new mongoose.Schema ({
	url: String
});
var Url = mongoose.model('Url', urlSchema);

app.get('/image/:word', function(req, res) {
	var search = 'http://api.pixplorer.co.uk/image?word=' + req.params.word + '&amount=7&size=l';
	request(search, function(error, response, body) {
		if(!error && response.statusCode === 200)
			res.send(JSON.parse(body).images);
	});
	var link = new Url({
		url: search
	});
	link.save(function(err) {
		if(err) throw err;
		console.log('Link saved successfully!');
	});
});

app.get('/latest', function(req, res) {
	Url.find({}, function(err, doc) {
		if (err) throw err;
		res.send(doc);
	}).
	limit(10);
});

app.get('/', function(req, res) {
	res.status(200);
	res.set('Content-type', 'text/html');
});

var server = app.listen(port, function() {
	console.log('Server running on port %s', port);
});

module.exports = server;