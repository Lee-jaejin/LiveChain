var html = require('choo/html');
var css = require('sheetify');
var path = require('path');

var link = require('./link');
var button = require('./button');

let isTouch = 0;
var Web3 = require('web3');
var web3Admin = require('web3admin');

var web3 = new Web3();
web3Admin.extend(web3); // web3Admin extends web3 method : e.g. personal, txpool, ...

// web3 provider set
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8903'));

var accountLength = web3.eth.accounts.length;

module.exports = function (state, emit) {
    var address = [[],[]];
    var style = css`
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
    return html`
    <main class=${ style }>
      <header>
        <div>
          ${ button('pink', setAccountList(), viewAccountsList)}
        </div>
        <div>
          ${ link('green', 'Back to video', '/broadcast_')}
        </div>
        <div>
          ${ link('grey', 'Back to menu', '/') }
        </div>>
        <div> 
          ${ button('green', 'ProviderSet', providerSet)}
        </div>
      </header>
      <footer>
        <ul>
        <li id="one">
            ${ address[0][0] } : ${ address[0][1] }
        </li>
        <li id="two">
            ${ address[1][0] } : ${ address[1][1] }
        </li>
        </ul>
        <div>
            ${ button('pink', 'Donate', sendTx) }
        </div>
        <div>
            ${ eventButton() }
        </div>
      </footer>
    </main>
  `

    function eventButton () {
        emit('eventDialog');
    }

    function sendTx () {
        web3.personal.unlockAccount(address[0][0],"1");
        web3.eth.sendTransaction({from:address[0][0], to:address[1][0], value:web3.toWei(10,'ether')});

        emit('donate');
    }

    function setAccountList () {
        if(isTouch === 0) {
            isTouch = 1;
            return 'Account list';
        }
        else {
            isTouch = 0;
            makeAccountList();
            return 'Set';       // TODO : Need to make method "account list output"
        }
    }
    // account list output function
    function makeAccountList () {
        var accountsTemp = web3.eth.accounts;
        for (var i=0; i < accountLength; i++ ) {
            address[i][0] = accountsTemp[i];
            var bigBalance = web3.eth.getBalance(accountsTemp[i]);
            address[i][1] = bigBalance.plus(21).toString(10);
        }
    }

    // check for valid hash, then open stream
    function viewAccountsList () {
        emit('viewAccounts')
    }

    function providerSet () {

        // checking web3 connection
        if (!web3.isConnected()) {
            console.log("Drbsi is not running!");
        } else {
            console.log("Connection success!" + "\nPort number : " + 8903);
        }
    }
}
