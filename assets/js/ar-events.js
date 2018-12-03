// import THREE.js from AR.js
THREEx.ArToolkitContext.baseURL = 'https://rawgit.com/jeromeetienne/ar.js/master/three.js/';

// event listener for aframe
AFRAME.registerComponent('handle-events', {
    init: function () {
        var el = this.el;
        // click event for space invaders
        el.addEventListener('click', function () {
            // emit event and remove from DOM
            socket.emit('kill', {score: parseInt($('#score').html()), id: el.id});
            $(el).remove();
        });
    }
});