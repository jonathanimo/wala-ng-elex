var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var nodemailer = require('nodemailer');
var jwt = require('express-jwt');



//json web token middleware
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//models for portions of elections
var Candidate = mongoose.model('Candidate');
var Race = mongoose.model('Race');
var Election = mongoose.model('Election');

//user model for authentication
var User = mongoose.model('User');


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

router.param('candidate', function(req, res, next, id) {
  var query = Candidate.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error('can\'t find candidate')); }
    req.candidate = candidate;
    return next();
  });
});

router.param('user', function(req, res, next, token) {
  var query = User.findOne({resetPasswordToken: token});
  query
  .exec(function (err,user){
    if (!user) { return next(new Error('can\'t find that user: ' + err)); }
        req.user = user;
        return next();
   })
});

/*************************************ROUTER POST REQUESTS***************************************************/

/*********************************************POST ELECTION************************************************************/
router.post('/api/v1/elections',auth, function(req, res, next) {
  var election = new Election(req.body);
  election.save(function(err, election){
    if(err){ return next(err); }
    res.json(election);
  });
});


/**********************************POST A RACE WITHIN SELECTED ELECTION**********************************/
router.post('/api/v1/elections/:election/race',auth, function(req, res, next) {
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

router.delete('/api/v1/elections/:election/races/:race',auth, function(req,res,next){
      Race.remove({
            _id: req.params.race
        }, function(err, race) {
            if (err)
            return res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
})

router.delete('/api/v1/elections/:election',auth, function(req,res,next){
      Election.remove({
            _id: req.params.election
        }, function(err, election) {
            if (err)
            return res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
})

router.delete('/api/v1/elections/:election/race/:race/candidate/:candidate',auth, function(req,res,next){
      Candidate.remove({
            _id: req.params.candidate
        }, function(err, candidate) {
            if (err)
            return res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
})

// router.put('/api/v1/elections/:election', function(req, res) {
//   var query = Election.findOne({'_id':req.election});
//   query
//   .find(function(err, elex){
//       if(err) return res.json(500); 
//      })
//     .populate({path:'races', model:'Race'})
//     .exec(function(err,elex){
//       var options = {
//         path:'races.candidates',
//         model:'Candidate'
//       };
//       if(err) return res.json(500);
//       Election.populate(elex,options,function(err,oneElectionDone){
//           res.json(oneElectionDone)
//       });
//     });
//   })

router.put('/api/v1/elections/:election/races/:race',auth, function(req, res) {

        Race.findById(req.params.race, function(err, race) {

            if (err)
                res.send(err);

            race.raceName = req.body.raceName;
            race.seats = req.body.seats;
            race.isOver = req.body.isOver;
            race.allVotes = req.body.allVotes;
            race.updated = Date.now();
            race.candidates = req.body.candidates;

            race.save(function(err) {
                if (err)
                    res.send(err);

              res.json({ message: 'Updated!' });
            });

        });
    });

router.put('/api/v1/elections/:election',auth, function(req, res) {
        Election.findById(req.params.election, function(err, election) {
            if (err)
                res.send(err);

            election.electionName = req.body.electionName;
            election.electionDate = Date.now();
            election.precinctsRep = req.body.precinctsRep;
            election.precinctsTotal = req.body.precinctsTotal;
            election.races = req.body.races;
            
            election.save(function(err) {
                if (err)
                    res.send(err);
                console.log(req.body.electionName);
                res.json({ message: 'Updated!' });
            });
        });
    });

router.put('/api/v1/elections/:election/races/:race/candidate/:candidate',auth, function(req, res) {

        Candidate.findById(req.params.candidate, function(err, candidate) {
            if (err)
                res.send(err);
            
            candidate.firstName = req.body.firstName;
            candidate.lastName = req.body.lastName;
            candidate.party = req.body.party;
            candidate.voteTotal = req.body.voteTotal;
            candidate.pctTotal = req.body.pctTotal;

            candidate.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Updated!' });
            });

        });
    });

/*********************************************POST A CANDIDATE WITHIN A RACE WITHIN AN ELECTION************************************************************/

router.post('/api/v1/elections/:election/race/:race/candidate',auth, function(req, res, next) {
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
//returns 400 bad request on post
router.post('/forgot', function(req, res, next) {
  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'SendGrid',
    auth: {
      user: 'jonathan_imo',
      pass: 'Wo0dchuck!'
      //TODO: add user and pw to environment variable
    }
  });
 User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      return res.status(400).json({message: 'Email doesn\'t exist!' });
    }
    if(user){
      user.generateResetToken();
      user.save(function(err, user) {
        if (err) return res.status(500).json({message:'Error saving user info:' + err});
        var mailOptions = {
          to: user.email,
          from: 'jonathanimo89@gmail.com',
          subject: 'Elex app Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + user.resetPasswordToken + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(error, response){
          if(error){
            return console.log(error);
          }
          console.log('Reset Message sent to: ' + user.email + '. ' +  response.message);
        }); 
      // return res.json({message:'Reset email sent to ' + user + 'check your email for further instructions.'})
      //TODO should flash message saying the above but it isn't right now
      });
    }
    else{
      return res.status(500).json({message: 'Something else is wrong! Let us know at jandrews@cbs46.com, or on twitter. @CBS46' });
    }
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

router.get('/api/v1/elections/:election/races', function(req, res) {
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
          res.json(oneElectionDone.races)
      });
    })

});

router.get('/api/v1/elections/:election/races/:race', function(req, res) {
    req.race.populate('candidates', function(err, race) {
    if (err) { return next(err); }
    res.json(req.race);
  });
});

router.get('/api/v1/elections/:election/races/:race/candidates', function(req, res) {
    res.json(req.candidates);
});

/********************************************AUTHENTICATION ROUTES*************************************************/

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password || !req.body.email){
    return res.status(400).json({message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password)
  user.save(function (err){
  if(err){ return next(err); }
    return res.json({token: user.generateJWT()})
  });
});


router.get('/forgot', function(req, res) {
  res.render('forgot', {
  });
});

router.get('/reset', function(req, res) {
  return res.json({message:'I don\'t think this page means what you think it means... Try logging in or Resetting your password?'});
});

router.get('/reset/:user', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.user, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      console.log(err);
      res.redirect('/#/forgot').json({message:'Reset token is invalid or has expired, get another one below.'});
    }
    res.json(req.user);
    });
  });

router.post('/reset/:user', function(req, res) {
  User.findOne({ email:user.email }, function(err, user) {
    if (!user) {
      console.log(err);
      //res.json({message:'Password reset token is invalid or has expired.'});
      return res.redirect('/#/forgot');
    }
    res.json(req.user);
    });
  });
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});


module.exports = router;
