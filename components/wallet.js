var html = require('choo/html')
var css = require('sheetify')

var link = require('./link')
var button = require('./button')

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
            ${ button('pink', List(), List) }
          </section>
          <section>
            ${ link('pink', 'Wallet', accList)}
          </section>
        </header>
        <footer>
          ${ link('grey', 'Back to menu', '/') }
        </footer>
    </main>
  `

    function List () {
        var list = state.acc;
        return 'Account List = ' + list;
    }

    // check for valid hash, then open stream
    function accList () {
        emit('accList')
    }
}
