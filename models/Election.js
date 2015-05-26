var mongoose = require('mongoose');

var ElectionSchema = new mongoose.Schema({
	electionName: String,
	electionDate: {type:Date, default: Date.now},
	races: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Race' }]
});

mongoose.model('Election', ElectionSchema);