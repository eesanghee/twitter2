var express = require( 'express' );
var app = express();
var swig= require('swig');
var morgan = require('morgan');

var logger = morgan('dev');

app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig
app.use(logger); //same logic as lines directly below
app.use(function (req, res, next) {
	console.log(req.method, req.path);
	next();
})

var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


app.get('/', function(req, res){
	res.render( 'index', {title: 'Hall of Fame', people: people} );
})
app.listen(3000);