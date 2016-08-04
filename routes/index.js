var express = require( 'express' );
var router = express.Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res){
	var tweets = tweetBank.list();
	res.render('index', {title: 'Twitter.js',tweets: tweets, showForm: true, userName: req.params.name});
});

router.get('/users/:name', function(req, res, next){
	var tweetsForName = tweetBank.find({name: req.params.name});
	res.render('index', {title: 'Twitter.js',tweets: tweetsForName, showForm: true, userName: req.params.name});
})

router.get('/tweets/:id', function(req,res, next){
	var tweetsWithThatId = tweetBank.find({id: +req.params.id});
	res.render('index', {title: 'Twitter.js', tweets: tweetsWithThatId});
})


router.post('/tweets',urlEncodedParser, function(req,res){
	var name = req.body.name;
	var text = req.body.text;
	var list = tweetBank.find({name: name});
	tweetBank.add(name, text);
	console.log(list)
	res.redirect('/')
})
// router.get('stylesheets/style.css', function(req,res){
//   res.sendFile('stylesheets/style.css', {root:__dirname + '/.../public'})
// })

module.exports = router;