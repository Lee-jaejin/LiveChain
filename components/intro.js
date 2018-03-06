var html = require('choo/html')

module.exports = function (state, emit) {
  return html`
    <body class="popup-dark">
        <a href=${ branch() }>Listing Accounts...</a>
    </body>
  `
}