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

  // initial account state (list)
  state.accountsProp = {
      accountAddress: [],
      accountBalance: []
  };

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

  // show accLis
    /*
  emitter.on('accList', function () {
    var accList = web3.eth.accounts;

    state.accountsProp = accList;
    document.write('Account List = ' + state.accountsProp);
  });
    */
  emitter.on('viewAccounts', function () {
//      state.accountsProp = web3.eth.accounts;

      emitter.emit('render');
  });
  // TODO list
/*
  // select account
  emitter.on('selectAcc', function () {
    // have to make list
  })

  // send Transaction
  emitter.on('sendTx', function () {
    document.write(sender)
  })

  // check balance

  // create account
*/
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

    emitter.emit('pushState', '/broadcast')
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

// start!
document.body.appendChild(app.start())