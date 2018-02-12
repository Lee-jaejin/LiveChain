var html = require('choo/html')
var onload = require('on-load')
var css = require('sheetify')

var mediaDevices = require('../lib/media-devices')
var broadcast = require('../lib/broadcast')
var button = require('./button')
var link = require('./link')

var $ = document.getElementById.bind(document)

module.exports = function (state, emit) {
    var divStyle = css`
    :host {
        .mainWin { width: 80%; }
        
        .roomTitle { width: 100%; }
        
        .preview { width: 100%; }
        video { width: 100%; }
        
        .roomInfo { width: 100%; }
        
        .overlay {
          position: fixed;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(256, 256, 256, 0.3);
          transition: opacity 0.5s;
        }
        
        header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 1rem;
        
          section {
            display: flex;
            flex-direction: row;
        
            > * { margin-right: 1rem; }
            :last-child { margin-right: 0; }
          }
        }
        
        footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 1rem;
        
          .share {
            display: flex;
            flex-direction: row;
            align-items: center;
        
            span { padding: 0 1rem 0 0; }
        
            input {
              font-size: 16px;
              padding: 0.4rem 0 0.4rem 0.65rem;
              width: 14rem;
              border: none;
              border-radius: 2px;
            }
          }
        }
    }
  `

    var div = html`
    <main class=${ divStyle } onmouseover=${ hoverEnter } onmouseout=${ hoverLeave }>
      <section class="conA">
        <div class="mainWin">
            <div class="roomTitle">
                <h2>Room Name</h2>
                <section>
                    ${ button(state.live ? 'red' : 'grey', state.live ? 'ON AIR' : 'OFF AIR') }
                    ${ button(state.live ? 'pink' : 'green', state.live ? 'Stop' : 'Start', state.live ? stop : start) }
                </section>
            </div>
            <div class="preview">
                <video id="player" autoplay></video>
            </div>
            <div class="roomInfo">
                <div class="logo">
                </div>
                <div class="contentsInfo">
                    ${ link('grey', 'Back to menu', '/') }
                  <div class="share">
                    <span>Share</span>
                    <input id="share" value=${ state.hash } readonly />
                  </div>
                    ${ link('pink', 'Wallet', '/wallet')}
                </div>
                <div class="viewerInfo">
                </div>
            </div>
        </div>
        <div class="sideWin">
            <div class="hideBtn">
            </div>
            <div class="donateList">
            </div>
            <div class="chatWin">
            </div>
            <div class="donateWin">
                <input id="chatInput" value="" />
            </div>
        </div>
      </section>
    </main>
  `

    // attach view lifecycle functions
    onload(div, load, unload)

    // return function to router
    return div

    // open media devices on entry
    function load() {
        var selected = state.sources.selected

        var video = selected.video
        var audio = selected.audio

        mediaDevices.start(video, audio, function (mediaStream) {
            window.stream = mediaStream
            $('player').volume = 0
            $('player').srcObject = mediaStream
        })
    }

    // stop media devices on exit
    function unload() {
        mediaDevices.stop()
    }

    // start broadcast
    function start() {
        var quality = state.quality
        broadcast.start(quality, window.stream, function (mediaRecorder, hash) {
            window.recorder = mediaRecorder
            emit('liveToggle', {live: true, hash: hash})
        })
    }

    // stop broadcast
    function stop() {
        broadcast.stop(window.recorder, function () {
            emit('liveToggle', false)
        })
    }

    // when user's mouse enters window
    function hoverEnter() {
        $('overlay').style = "opacity: 1"
    }

    // when user's mouse leaves window
    function hoverLeave() {
        $('overlay').style = "opacity: 0"
    }
}
