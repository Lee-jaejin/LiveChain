var html = require('choo/html');
var path = require('path');
var imgPath = path.join(__dirname,'../assets/images/ic_shoot_coin.svg');

module.exports = accountList;

function accountList () {
    var numberOfAccounts = web3.eth.accounts.length;
    var accounts = web3.eth.accounts;
    var div = [];

    for (var i=0; i<numberOfAccounts; i++) {
        div[i] = html`
        <div class="row list">
            <div class="col-md-8">
                <div class="row mb-3">
                    <div class="col-md-3"><span class="badge badge-pill badge-style">ADDRESS</span></div>
                    <div class="col-md-9 address">${ accounts[i] }</div>
                </div>
                <div class="row">
                    <div class="col-md-3"><span class="badge badge-pill badge-style">BALANCE</span></div>
                    <div class="col-md-9 balance"><img src=${ imgPath }
                     class="coin"> <span>${ web3.eth.getBalance(accounts[i]).toString(10) }<small>SHT</small></span></div>
                </div>
            </div>
            
            <div class="col-md-4"><a class="btn btn-lg btn-pointcolor col-sm-12" href=${ '/main_shooter_appView' } role="button">입장 <small class="d-block">ENTRANCE</small></a></div>
        </div>
        `;
    }

    return div;
}
