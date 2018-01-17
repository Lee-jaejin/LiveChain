var html = require('choo/html')
var onload = require('on-load')
var css = require('sheetify')

var mediaDevices = require('../lib/media-devices')
var broadcast = require('../lib/broadcast')
var button = require('./button')
var link = require('./link')

var Web3 = require('web3')

var $ = document.getElementById.bind(document)

module.exports = function (state, emit) {
  var divStyle = css`
    :host {
      .preview { width: 100%; }
      video { width: 100%; }

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
    <main class=${ divStyle }>
      <div class="overlay" id="overlay">
        <header>
          <section>
            ${ button('blue', accList(), accList)}
          </section>
        </header>
      </div>
    </main>
  `

  // return function to router
  return div

  // account list
  function accList () {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8903"));
    var listAccount = web3.eth.coinbase;
    
    emit('accList')
  }
}
