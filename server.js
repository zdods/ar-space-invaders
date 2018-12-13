// EXPRESS & SERVER REQs
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// RUN CONFIG SCRIPTS
const config = require('./config');
config.run();

// IMPORT LEADBOARD ENTRY DATA MODEL
const leaderboard = require('./data-models/leaderboard');

// GLOBAL VARS
var queue = 0;
// keep track of connected players with an int

// SERVE ENTIRE APP DIRECTORY - nothing private here boss
app.use(express.static(__dirname + '/'));

// handle webpage requests for...
// INDEX
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
// ADMIN DASHBOARD
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/views/dashboard.html')
});

// API reqs
// get leaderboard data
app.get('/leaderboard', (req, res) => {
    leaderboard.find().sort('-score').exec(function(err, players) {
        if (err)
            res.send(err);

        res.json(players);
    });
});

// SET PORT & START SERV
var port = process.env.PORT || 8080;
http.listen(port, () => {
    console.log(`GAME RUNNING ON PORT ${port}`);
});

// 
// SOCKET.IO
// 
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
        }, 60000) // 1 minute rounds, dog
    });

    // handle when user data needs to be saved
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

    // player leaves
    socket.on('disconnect', () => {
        // still considering what to do on client DC
        // queue--
    });
});