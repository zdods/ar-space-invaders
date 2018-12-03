module.exports.run = () => {
    // DATABASE CONNECTION
    const mongoose = require('mongoose');
    mongoose.connect(`mongodb://localhost:27017/space-invaders`, {
        useNewUrlParser: true
    });
}