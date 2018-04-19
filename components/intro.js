var html = require('choo/html')

module.exports = function (state, emit) {
    return html`
        <body class="popup-dark" onload=${ br }>
            <h3>Loading Accounts ... </h3>
        </body>
    `

    function br() {

        if (!web3.isConnected()) {
            console.log('Please download Shoot client!');
            //TODO : have to link BI web site to download the client.
            emit('account_01'); // this return string is just for test
        }
        else {
            var isAccountExist = web3.eth.accounts.length;
            if (isAccountExist === 0) {
                emit('account_01');
            }
            else {
                if (state.roomEntryAccount === '') {
                    emit('coinView');
                }
                emit('account_04');
            }
        }
    }
}