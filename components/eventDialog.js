var html = require('choo/html')
var css = require('sheetify')
var eventWindow = null;

module.exports = eventDialog;

function eventDialog (color, text) {
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
    <div class=${ style }>
    <button id="close" class=${ style } style=${ bgColor() }>
      ${ text }
    </button>
    <script>
        const {BrowserWindow} = require('electron').remote;
        var path = require('path');

        const btn_event = document.querySelector('#close');

        for (var i=0; i<3; i++) {
            btn_event.addEventListener('click', function () {
                eventWindow = new BrowserWindow();
                eventWindow.on('close', function () {
                    eventWindow = null;
                });
    
                eventWindow.loadURL('file://' + path.join(__dirname,'account/popup_account_01.html'));
            })
        }
        
    </script>
    </div>
  `

    function bgColor () {
        return `background: var(--color-${ color });`
    }
}
