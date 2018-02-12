var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8903'));

var app = choo()

app.use(function (state, emitter) {
  // initial state
  state.hash = ''
  state.live = false
  state.quality = 3
  state.sources = {
    available: {
      video: [],
      audio: []
    },
    selected: {
      video: null,
      audio: null
    }
  }

  state.donate = false

  // initial tx state
  

  // toggle on  broadcast start/stop
  emitter.on('liveToggle', function (data) {
    emitter.emit('updateHash', data.live ? data.hash : '')
    state.live = data.live

    emitter.emit('render')
  })

  // sets broadcast bitrate
  emitter.on('qualityToggle', function () {
    var quality = state.quality
    state.quality = (quality === 1) ? 3 : (quality - 1)

    emitter.emit('render')
  })

  emitter.on('viewAccounts', function () {
//      state.accountsProp = web3.eth.accounts;
    emitter.emit('render');
  });

  emitter.on('eventDialog', function () {
//      let win = new eventWindow({width:800, height:600});
//      win.loadURL('file://' + path.join(__dirname, 'indexTwo.html'))
    emitter.emit('render');
  });

  // sets available sources for broadcasting
  emitter.on('sourcesAvailable', function (data) {
    state.sources.available = {
      video: data.video,
      audio: data.audio
    }

    emitter.emit('render')
  })

  // select broadcast sources
  emitter.on('sourcesSelect', function (data) {
    state.sources.selected = {
      video: data.video,
      audio: data.audio
    }

    emitter.emit('pushState', '/broadcast_')
  })

  // update stream hash
  emitter.on('updateHash', function (data) {
    state.hash = data
  })

  // watch stream
  emitter.on('watch', function (data) {
    emitter.emit('updateHash', data)

    if (state.hash.length === 64) {
      emitter.emit('redirect', '/view')
    }
  })

  // redirect utility
  emitter.on('redirect', function (data) {
    emitter.emit('pushState', data)
  })
})

// import base stylesheet
css('./style.css')

// routes
app.route('/', require('./components/home'))
app.route('/broadcast', require('./components/broadcast'))
app.route('/view', require('./components/viewer'))
app.route('/settings', require('./components/settings'))
app.route('/wallet', require('./components/wallet'))
app.route('/broadcast_', require('./components/broadcast_'))

// start!
document.body.appendChild(app.start())