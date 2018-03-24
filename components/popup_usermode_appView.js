var html = require('choo/html')

module.exports = function (state, emit) {
  return html`
  <body class="popup-dark">
  
      <p class="close"><a href="javascript:frameclose()" class="text-hide">창닫기</a> </p>
      
      <div class=" popup-bgimg">
          <div class="container">
              <header class="header clearfix">
                  <h2 class="popup-logo text-hide">SHOOT</h2>
              </header>

                  <div class="usermode">
                      <h5 class="fw-light">환영합니다. </h5>
                      <h1 class="fw-light">사용자 모드를 선택해주세요.</h1>
                  </div>
                  <div class="btn-mode mt-5 mb-5">
                      <a class="btn btn-lg btn-pointcolor" href=${'/popup_shooter_01_appView'} role="button"><em></em>크리에이터</a>
                      <a class="btn btn-lg btn-pointcolor" href=${'/popup_keeper_01_appView'} role="button"><em></em>뷰어</a>
                  </div>
                  <p class="script">가이드 위한 스크립트를 입력합니다.</p>
  
          </div>
          <!--//container-->
      </div>
      <!--//popup-bgimg-->
  
  </body>
  `
}