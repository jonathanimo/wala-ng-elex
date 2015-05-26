var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var Candidate = mongoose.model('Candidate');
var Race = mongoose.model('Race');
var Election = mongoose.model('Election');

router.get('/election', function(req, res, next) {
	Election.find(function(err, elections){
    	if(err){ 
    		return next(err); 
    	}
	res.json(elections);
	});
})

router.post('/election', function(req, res, next) {
  var election = new Election(req.body);

  election.save(function(err, election){
    if(err){ return next(err); }

    res.json(election);
  });
});

router.param('election', function(req, res, next, id) {
  var query = Election.findById(id);

  query.exec(function (err, election){
    if (err) { return next(err); }
    if (!election) { return next(new Error('can\'t find election')); }

    req.election = election;
    return next();
  });
});

router.get('/election/:election', function(req, res) {
  res.json(req.election);
});

router.post('/election/:election/races', function(req, res, next) {
  var race = new Race(req.body);
  race.post = req.post;

  race.save(function(err, race){
    if(err){ return next(err); }

    req.post.races.push(race);
    req.post.save(function(err, election) {
      if(err){ return next(err); }
      res.json(race);
    });
  });
});

module.exports = router;
