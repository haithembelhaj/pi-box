'use strict';

var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);

var pipe = '/tmp/omxcontrol';
var omx = {};

omx.stop = function() {

    console.info('killing omxplayer..');

    return exec('rm -f '+pipe).then(function(){

        omx.isRunning = false;

        //return exec('killall omxplayer.bin')

    }).error(function(e){

        console.error(e);
    })
};

omx.start = function(options) {

    omx.stop().then(function(){

        return exec('mkfifo '+pipe)
            .then(function(){

                console.info('start OMX');

                exec('omxplayer -p -o hdmi "' + options.input + '" < ' + pipe);
                omx.play();
            });
    });
};

omx.sendCommand = function(key) {
    return exec('echo -n '+key+' > '+pipe);
};

omx.mapKey = function(command,key) {

    omx[command] = function() {

        console.info('send ', command);

        return omx.sendCommand(key);
    };
};

omx.mapKey('volumeUp', '+');
omx.mapKey('volumeDown', '-');
omx.mapKey('pause','p');
omx.mapKey('resume','p');
omx.mapKey('quit','q',function() {
    omx.stop();
});
omx.mapKey('play','.');
omx.mapKey('forward',"\x5b\x43");
omx.mapKey('backward',"\x5b\x44");
omx.mapKey('nextSubtitle', 'm');
omx.mapKey('previousSubtitle', 'n');
omx.mapKey('nextChapter', 'o');
omx.mapKey('previousChapter', 'i');
omx.mapKey('nextAudio', 'k');
omx.mapKey('previousAudio', 'j');
omx.mapKey('increaseSpeed', '1');
omx.mapKey('decreaseSpeed', '2');

module.exports = omx;