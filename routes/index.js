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
/*************************************router parameters***************************************************/

router.param('election', function(req, res, next, id) {
  var query = Election.findById(id);
  query
  .exec(function (err,elex){
    if (!elex) { return next(new Error('can\'t find election')); }
        req.election = elex;
        return next();
   })
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

/*************************************ROUTER POST REQUESTS***************************************************/

/*********************************************POST ELECTION************************************************************/
router.post('/api/v1/elections', function(req, res, next) {
  var election = new Election(req.body);
  election.save(function(err, election){
    if(err){ return next(err); }
    res.json(election);
  });
});


/**********************************POST A RACE WITHIN SELECTED ELECTION**********************************/
router.post('/api/v1/elections/:election/race', function(req, res, next) {
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

/*********************************************POST A CANDIDATE WITHIN A RACE WITHIN AN ELECTION************************************************************/

router.post('/api/v1/elections/:election/race/:race/candidate', function(req, res, next) {
  var candidate = new Candidate(req.body);
  candidate.race = req.race;
  candidate.save(function(err, candidate){
    if(err){ return next(err); }
    req.race.candidates.push(candidate);
    req.race.save(function(err, race) {
      if(err){ return next(err); }
      res.json(candidate);
    });
  });
});


/*************************************router GET requests***************************************************/
router.get('/api/v1/elections', function(req, res, next) {
	Election
    .find(function(err, elex){
    	if(err) return res.json(500); 
	   })
    .populate({path:'races', model:'Race'})
    .exec(function(err,elex){
      var options = {
        path:'races.candidates',
        model:'Candidate'
      };
      if(err) return res.json(500);
      Election.populate(elex,options,function(err,electionsDone){
          res.json(electionsDone)
      });
    })
});

router.get('/api/v1/elections/:election', function(req, res) {
  var query = Election.findOne({'_id':req.election});
  query
  .find(function(err, elex){
      if(err) return res.json(500); 
     })
    .populate({path:'races', model:'Race'})
    .exec(function(err,elex){
      var options = {
        path:'races.candidates',
        model:'Candidate'
      };
      if(err) return res.json(500);
      Election.populate(elex,options,function(err,oneElectionDone){
          res.json(oneElectionDone)
      });
    })

  // req.election
  //   .populate({path:'races',model:'Race'})
  //   .exec(function(err, elex){
  //   if (err) { return next(err); }
  //   res.json(elex);
  // });
    //.exec
});

router.get('/api/v1/elections/:election/race/:race', function(req, res) {
    req.race.populate('candidates', function(err, race) {
    if (err) { return next(err); }
    res.json(req.race);
  });
});

router.get('/api/v1/elections/:election/race/:race/candidates', function(req, res) {
    res.json(req.candidates);
});

module.exports = router;
