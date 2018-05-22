var html = require('choo/html');

module.exports = input;

function input (value, placeholder, inputType, onblur) {
  return html`<input type=${ inputType } class="form-control form-control-lg col-md-7"
              placeholder=${ placeholder } value=${ value } onblur=${ onblur } />`
}
