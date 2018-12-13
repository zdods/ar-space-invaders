const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema({
    name: String,
    score: Number
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);