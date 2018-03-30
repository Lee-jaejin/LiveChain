var recorder = require('media-recorder-stream');
var hypercore = require('hypercore');
var hyperdiscovery = require('hyperdiscovery');
var desktopCapturer = require('electron').desktopCapturer;
var cluster = require('webm-cluster-stream');
var pump = require('pump');
var Web3 = require('web3');

module.exports = {
    start: start,
    stop: stop
};

// start broadcast
function start(quality, media, cb) {

    // create bitrate options
    var video = (quality === 3) ? 800000 : (quality === 2) ? 500000 : 200000;
    var audio = (quality === 3) ? 128000 : (quality === 2) ? 64000 : 32000;

    // create MediaRecorder
    var opts = {
        interval: 1000,
        videoBitsPerSecond: video,
        audioBitsPerSecond: audio,
    };

    // create MediaRecorder stream
    var mediaRecorder = recorder(media, opts);

    // create a feed
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var newDate = year + '_' + month + '_' + day + '_' + hour;

    var feed = hypercore(`./streams/broadcasted/${ newDate }`);

    // join p2p swarm & run callback
    var swarm;

    // when feed is ready,
    feed.on('ready', function () {
        swarm = hyperdiscovery(feed, {
            live: true
        });

        var hash = feed.key.toString('hex');
        cb(mediaRecorder, hash);
    });

    // pipe MediaRecorder to webm transform
    // when MediaRecorder is destroyed, close feed & swarm
    var stream = pump(mediaRecorder, cluster(), function (err) {
        if (err) console.log('err: ', err);
        swarm.close();
        feed.close(function (err) {
            if (err) console.log('err: ', err);
        });
    });

    // append any new video to feed
    stream.on('data', function (data) {
        console.log(data.length, Math.floor(data.length / 16 / 1024), Math.floor(data.length / 10));
        feed.append(data);
    });
}

// stop broadcast
function stop(recorder, cb) {
    recorder.stop();
    cb();
}