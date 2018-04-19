var html = require('choo/html');
var path = require('path');
var imgPath = path.join(__dirname,'../assets/images/ic_shoot_coin.svg');

module.exports = function (state, emit) {
    var numberOfAccounts = web3.eth.accounts.length;
    var accounts = web3.eth.accounts;
    var div = [];

    for (var i = 0; i < numberOfAccounts; i++) {
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
                     class="coin"> <span>${ web3.fromWei(web3.eth.getBalance(accounts[i]), 'ether').toString(10) }<small>SHT</small></span></div>
                </div>
            </div>
            
            <div class="col-md-4"><a class="btn btn-lg btn-pointcolor col-sm-12" id=${i} href=${ '/popup_usermode_appView' } onfocus=${ accountSelect }>입장 <small class="d-block">ENTRANCE</small></a></div>
        </div>
        `;
    }

    return html`
        <body class="popup-dark">
            <p class="close"><a href="javascript:frameclose()" class="text-hide">창닫기</a> </p>
            <div class=" popup-bgimg">
                <div class="container">
                    <header class="header clearfix">
                        <h3 class="popup-title">My Account</h3>
                        <h2 class="popup-logo text-hide">SHOOT</h2>
                    </header>
                    <div id="accountlist" class="account-list">
                        ${ div }
                    </div>
                    <!--//account-list-->
                </div>
                <!--//container-->
            </div>
            <!--//popup-bgimg-->
        </body>
    `

    function accountSelect(e) {
        var id = e.target.getAttribute('id');
        if (id <= numberOfAccounts) {
            state.roomEntryAccount = accounts[id];
        }
    }
}