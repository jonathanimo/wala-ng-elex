var mongoose = require('mongoose');

var RaceSchema = new mongoose.Schema({
		//raceId: mongoose.Schema.Types.ObjectId,
        raceName: String,
        seats: {type: Number, default: 0},
        isOver: Boolean,
        allVotes: {type: Number, default: 0},
        updated: {type: Date, default: Date.now},
        candidates: [{type: mongoose.Schema.Types.ObjectId, ref:'Candidate'}]
});

RaceSchema.methods.calculateVotes = function(candidates){
	var newVoteTotal = 0;
	for (var i = candidates.length - 1; i >= 0; i--) {
		newVoteTotal += candidates[i].voteTotal;
	}
	return newVoteTotal;
};

mongoose.model('Race', RaceSchema);