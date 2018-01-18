var html = require('choo/html')
var onload = require('on-load')
var css = require('sheetify')

var button = require('./button')
var link = require('./link')

var Web3 = require('web3')

var $ = document.getElementById.bind(document)

module.exports = function (state, emit) {

    var div = html `
      <div>
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
    function accList() {
        var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8903"));
        var listAccount = web3.eth.coinbase;

        emit('accList')
    }

    function sendTx() {
        var sender = web3.eth.defaultAccount;
        document.write(sender);

        emit('sendor');
    }
}