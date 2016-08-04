var express = require( 'express' );
var app = express();
var swig= require('swig');
var morgan = require('morgan');
var routes = require('./routes');
app.use('/', routes);
var logger = morgan('dev');
var fs = require('fs');
var path = require('path'); //tool for dealing with relative and absolute paths
var mime = require('mime');

app.set('views', __dirname + '/views'); // point res.render to the proper directory
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig

app.use(logger); //same logic as lines directly below

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

//--------
//No longer needed because of routes
// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


// app.get('/', function(req, res){
// 	res.render( 'index', {title: 'Hall of Fame', people: people} );
// })
//------
app.listen(3000);