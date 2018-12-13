// connect to socket
var socket = io();

// handle updating score
socket.on('updateScore', function (res) {
    $('#score').html(res.score);
});

// handle kill event
socket.on('kill', function (id) {
    $('#' + id).remove();
});

// on game end
socket.on('end', function (id) {
    socket.emit('userData', {
        name: $('#username').html(),
        score: $('#score').html()
    });
});

// display final results
socket.on('results', (results) => {
    var players = '';
    results.forEach(player => {
        players += `${player.name}: ${player.score}\n`
    });
    alert(`GAME OVER\n${players}`);
    window.location.href = '/'
});

// on game start
socket.on('start', function (res) {
    if (!$('#username').html()) {
        alert("You didn't enter a name soon enough, the game has started without you!");
        return
    }
    // update if game running
    $('#alerts #message').html('game in progress');

    // add space invaders to client DOM
    // H U G E multi-line string boss
    $('a-marker').append(`
        <!-- GREEN -->
        <a-box id="g1" color="#3DFF45" position="-0.5 0 -1" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="g2" color="#3DFF45" position="-0.3 0 -1" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="g3" color="#3DFF45" position="-0.1 0 -1" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="g4" color="#3DFF45" position="0.1 0 -1" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="g5" color="#3DFF45" position="0.3 0 -1" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="g6" color="#3DFF45" position="0.5 0 -1" scale="0.1 0.1 0.1" handle-events>
        </a-box>

        <!-- BLUE -->
        <a-box id="b1" color="#3AEBEF" position="-0.5 0 -0.8" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="b2" color="#3AEBEF" position="-0.3 0 -0.8" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="b3" color="#3AEBEF" position="-0.1 0 -0.8" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="b4" color="#3AEBEF" position="0.1 0 -0.8" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="b5" color="#3AEBEF" position="0.3 0 -0.8" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="b6" color="#3AEBEF" position="0.5 0 -0.8" scale="0.1 0.1 0.1" handle-events>
        </a-box>

        <!-- PURPLE -->
        <a-box id="p1" color="#AD39FF" position="-0.5 0 -0.6" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="p2" color="#AD39FF" position="-0.3 0 -0.6" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="p3" color="#AD39FF" position="-0.1 0 -0.6" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="p4" color="#AD39FF" position="0.1 0 -0.6" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="p5" color="#AD39FF" position="0.3 0 -0.6" scale="0.1 0.1 0.1" handle-events>
        </a-box>
        <a-box id="p6" color="#AD39FF" position="0.5 0 -0.6" scale="0.1 0.1 0.1" handle-events>
        </a-box>
    `);
});