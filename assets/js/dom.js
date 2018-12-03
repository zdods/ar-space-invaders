// random scripts here
$(document).ready(function () {
    var username;
    $('#name-form').submit(function (e) {
        e.preventDefault();

        username = $('#name-input').val();
        socket.emit('join', {
            name: $('#name-input').val()
        });

        $('#name-form').remove();

        $('#username').html(username);
    });
});