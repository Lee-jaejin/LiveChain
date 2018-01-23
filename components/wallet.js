var html = require('choo/html')
var css = require('sheetify')

var link = require('./link')
var button = require('./button')

let isTouch = 0;

module.exports = function (state, emit) {
    var style = css`
    :host {
      .preview { width: 100%; }
      video { width: 100%; }

      .overlay {
        position: fixed;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: rgba(256, 256, 256, 0.3);
        transition: opacity 0.5s;
      }

      header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;

        section {
          display: flex;
          flex-direction: row;

          > * { margin-right: 1rem; }
          :last-child { margin-right: 0; }
        }
      }

      footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;

        .share {
          display: flex;
          flex-direction: row;
          align-items: center;

          span { padding: 0 1rem 0 0; }

          input {
            font-size: 16px;
            padding: 0.4rem 0 0.4rem 0.65rem;
            width: 14rem;
            border: none;
            border-radius: 2px;
          }
        }
      }
    }
  `
    return html`
    <main class=${ style }>
      <header>
        <section>
          ${ button('pink', accList(), accListToggle)}
        </section>
        <section>
          ${ link('green', 'Back to video', '/broadcast')}
        </section>
      </header>
      <footer>
        <section>
          ${ link('grey', 'Back to menu', '/') }
        </section>>
      </footer>
    </main>
  `

    function accList () {
        if(isTouch === 0) {
            isTouch = 1;
            return 'Account list';
        }
        else {
            isTouch = 0;
            return state.acc;
        }
    }
    // check for valid hash, then open stream
    function accListToggle () {
        emit('accListToggle')
    }
}
