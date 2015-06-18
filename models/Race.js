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

mongoose.model('Race', RaceSchema);