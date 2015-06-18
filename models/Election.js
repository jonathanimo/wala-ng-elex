var mongoose = require('mongoose');

var ElectionSchema = new mongoose.Schema({
	electionName: String,
	electionDate: {type:Date, default:Date.now},
    precinctsRep: {type:Number, default: 0},
    precinctsTotal: {type:Number, default: 0},
	races: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Race' }]
});

mongoose.model('Election', ElectionSchema);