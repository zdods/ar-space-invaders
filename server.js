const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const config = require('./config');
config.run();

const leaderboard = require('./models/leaderboard');

var queue = 0;

app.use(express.static(__dirname + '/'));

// handle webpage requests
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/views/dashboard.html')
});

// get leaderboard
app.get('/leaderboard', (req, res) => {
    leaderboard.find().sort('-score').exec(function(err, players) {
        if (err)
            res.send(err);

        res.json(players);
    });
});

// add to leaderboard
app.post('/leaderboard', (req, res) => {

});

// testing port
var port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log(`GAME RUNNING ON PORT ${port}`);
});

// on client connect
io.on('connection', (socket) => {
    // console.log(Object.keys(io.sockets.connected));

    // handle kill event on socket
    socket.on('kill', (e) => {
        socket.emit('updateScore', {
            score: e.score += 100
        })
        io.emit('kill', e.id);
    });

    // handle event to start game
    socket.on('start', (e) => {
        io.emit('start');
        setTimeout(() => {
            io.emit('end');
        }, 60000)
    });

    socket.on('userData', (player) => {
        var result = new leaderboard();
        var sessionsResults = []
        result.name = player.name;
        result.score = player.score;

        sessionsResults.push(result);
        result.save((err, player) => {
            if(err)
                res.json(err)
            queue--
            console.log(queue);
            if(!queue){
                io.emit('results', sessionsResults);
            }
        })
    });

    // player join
    socket.on('join', (player) =>{
        io.emit('displayPlayer', player);
        queue++
    });

    // placeholder for disconnect events
    socket.on('disconnect', () => {

    });
});