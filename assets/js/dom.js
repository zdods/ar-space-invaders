// random scripts here
$(document).ready(function () {

    // init username var
    var username;

    // on username form submit
    $('#name-form').submit(function (e) {
        // stop that refresh boss
        e.preventDefault();

        // update username var
        username = $('#name-input').val();

        // emit a join event to the server
        socket.emit('join', {
            name: $('#name-input').val()
        });

        // remove that name form, boss
        $('#name-form').remove();

        // append username to UI
        $('#username').html(`${username} | `);
    });
});