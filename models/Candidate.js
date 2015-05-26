var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    party: String,
    voteTotal: {type: Number, default: 0},
    pctTotal: {type: Number, default: 0},
    races: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Race' }]
});

mongoose.model('Candidate', CandidateSchema);