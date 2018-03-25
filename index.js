var choo = require('choo');
var css = require('sheetify');

var app = choo();

app.use(function (state, emitter) {
    // account state
    state.accountHash = '';
    state.accountPS = '';
    state.temp = '';
    state.roomName = '';
    state.roomEntryAccount = '';

    // initial state
    state.hash = '';
    state.live = false;
    state.vquality = 3;
    state.sources = {
        available: {
            video: [],
            audio: []
        },
        selected: {
            video: null,
            audio: null
        }
    };

    // toggle on  broadcast start/stop
    emitter.on('liveToggle', function (data) {
        emitter.emit('updateHash', data.live ? data.hash : '');
        state.live = data.live;

        emitter.emit('render');
    });

    // sets broadcast bitrate
    emitter.on('qualityToggle', function () {
        var quality = state.quality;
        state.quality = (quality === 1) ? 3 : (quality - 1);

        emitter.emit('render');
    });

    emitter.on('viewAccounts', function () {
        emitter.emit('render');
        console.log(state.events);
    });

    emitter.on('eventDialog', function () {
        emitter.emit('render');
    });

    // sets available sources for broadcasting
    emitter.on('sourcesAvailable', function (data) {
        state.sources.available = {
            video: data.video,
            audio: data.audio
        };

        emitter.emit('render');
    });

    // select broadcast sources
    emitter.on('sourcesSelect', function (data) {
        state.sources.selected = {
            video: data.video,
            audio: data.audio
        };

        emitter.emit('pushState', '/broadcast_');

        console.log(state.events);
    });

    // update stream hash
    emitter.on('updateHash', function (data) {
        state.hash = data;
    });

    emitter.on('updateRoomName', function () {
        emitter.emit('render');
    });

    emitter.on('updateAccountHash', function () {
        emitter.emit('render');
    });

    // watch stream
    emitter.on('watch', function (data) {
        emitter.emit('updateHash', data);

        if (state.hash.length === 64) {
            emitter.emit('redirect', '/view');
        }
    });

    // redirect utility
    emitter.on('redirect', function (data) {
        emitter.emit('pushState', data);
    });

    emitter.on('account03', function () {
        emitter.emit('pushState', '/popup_account_03_appView')
    })

    emitter.on('account02', function () {
        emitter.emit('pushState', '/popup_account_02_appView')
    })

    emitter.on('usermode', function () {
        emitter.emit('pushState', '/popup_usermode_appView')
    })
});

// import base stylesheet
css('./style.css');

// routes
app.route('/', require('./components/intro'));
app.route('/view', require('./components/viewer'));
app.route('/settings', require('./components/settings'));
app.route('/wallet', require('./components/wallet'));
app.route('/popup_shooter_01_appView', require('./components/popup_shooter_01_appView'));
app.route('/main_shooter_appView', require('./components/main_shooter_appView'));
app.route('/popup_account_01_appView', require('./components/popup_account_01_appView'));
app.route('/popup_account_02_appView', require('./components/popup_account_02_appView'));
app.route('/popup_account_03_appView', require('./components/popup_account_03_appView'));
app.route('/popup_account_04_appView', require('./components/popup_account_04_appView'));
app.route('/popup_usermode_appView', require('./components/popup_usermode_appView'));
app.route('/popup_keeper_01_appView', require('./components/popup_keeper_01_appView'));
app.route('/main_shoot_onairlist', require('./components/main_shoot_onairlist'));
app.route('/accountList', require('./components/accountList'));

// start!
document.body.appendChild(app.start());