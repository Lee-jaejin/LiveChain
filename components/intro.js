var html = require('choo/html')

module.exports = function (state, emit) {
    return html`
        <body class="popup-dark">
            <a href=${ branch() }>Loading Accounts ... </a>
        </body>
    `
}