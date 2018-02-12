var html = require('choo/html')
var css = require('sheetify')

module.exports = buttonText

function buttonText (color, text) {
  var style = css`
    :host {
      border: none;
      color: #FFFFFF;
      padding: 0.5rem 0.6rem 0.45rem 0.6rem;
      font-size: 18px;
      border-radius: 2px;
      text-decoration: none;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  `

  return html`
    <p class=${ style } style=${ bgColor() }>
      ${ text }
    </p>
  `

  function bgColor () {
    return `background: var(--color-${ color });`
  }
}
