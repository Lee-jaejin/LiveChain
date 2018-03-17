var html = require('choo/html');

module.exports = input;

function input (value, placeholder, onblur) {
  return html`<input type="password" class="form-control form-control-lg col-md-7"
              placeholder=${ placeholder } value=${ value } onblur=${ onblur } />`
}
