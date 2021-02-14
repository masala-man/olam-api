var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

// avoid deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to database
mongoose.connect('mongodb://localhost:27017/olam');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to Database");
  });

var Word = require('./app/models/word');

var router = express.Router();  

// test message
router.get('/', function(req, res) {
	res.json({ message: 'olam-api _/\_' });	
});

// set routes
router.route('/define/en/:english_word')
.get(function(req, res) {
	Word.find({ "english_word": req.params.english_word}, function(err, result) {
		if (err)
			res.send(err);
		console.log(result)
		res.json(result);
	});
})
router.route('/define/ml/:malayalam_word')
.get(function(req, res) {
	Word.find({ "malayalam_definition": req.params.malayalam_word}, function(err, result) {
		if (err)
			res.send(err);
		console.log(result)
		res.json(result);
	});
})

app.use('/api', router);

app.listen(port);
console.log('Server listening on ' + port);
