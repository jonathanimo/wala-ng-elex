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


router.param('election', function(req, res, next, id) {
  var query = Election.findById(id);
  query.exec(function (err, election){
    if (err) { return next(err); }
    if (!election) { return next(new Error('can\'t find election')); }
    req.election = election;
    return next();
  });
});

router.param('race', function(req, res, next, id) {
  var query = Race.findById(id);
  query.exec(function (err, race){
    if (err) { return next(err); }
    if (!race) { return next(new Error('can\'t find race')); }
    req.race = race;
    return next();
  });
});

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

router.get('/election/:election', function(req, res) {
   req.election.populate('races', function(err, election) {
    if (err) { return next(err); }
    res.json(req.election);
  });
});

router.get('/election/:election/race/:race', function(req, res) {
    res.json(req.election.race);
});

router.post('/election/:election/race', function(req, res, next) {
  var race = new Race(req.body);
  race.election = req.election;
  race.save(function(err, race){
    if(err){ return next(err); }
    req.election.races.push(race);
    req.election.save(function(err, election) {
      if(err){ return next(err); }
      res.json(race);
    });
  });
});

router.post('/election/:election/race/:race/candidate', function(req, res, next) {
  var candidate = new Candidate(req.body);
  candidate.race = req.election.race;
  candidate.save(function(err, candidate){
    if(err){ return next(err); }
    req.election.races.race.candidates.push(candidate);
    req.race.save(function(err, race) {
      if(err){ return next(err); }
      res.json(candidate);
    });
  });
});



module.exports = router;
