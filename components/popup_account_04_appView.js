var html = require('choo/html');
var accountList = require('./components/accountList');

module.exports = function (state, emit) {
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
                            ${ accountList() }
                        </div>
                        <!--//account-list-->
                </div>
                <!--//container-->
            </div>
            <!--//popup-bgimg-->
            
        </body>
    `
}