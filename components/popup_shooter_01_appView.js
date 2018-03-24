var html = require('choo/html');

module.exports = function (state, emit) {
    return html`

        <body class="popup-dark">
        <p class="close"><a href="javascript:frameclose()" class="text-hide">창닫기</a> </p>
      
        <div class=" popup-bgimg">
            <div class="container">
                <header class="header clearfix">
                    <h3 class="popup-title">Room Setting</h3>
                    <h2 class="popup-logo text-hide">SHOOT</h2>
                </header>
    
                    <div class="room-setting">
                        <h6 class="fw-light mb-3">방 이름을 설정해주세요. (필수) </h6>
    
                        <form>
                            <div class="form-group mb-5">
                                <label for="">방 이름</label>
                                <input type="text" class="form-control form-control-lg" id="" placeholder="방 이름을 입력하세요." onblur=${ roomNameSave }> 
                            </div>
                          
                        <h6 class="fw-light mb-3">On Air 방송 공개 여부 (선택) </h6>  
                            <p class="fw-light text-muted"> 동의할 경우, SHOOT 웹사이트 On Air List 채널에 방송이 공개됩니다. </p>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input"> 동의합니다.
                            </div>
                        </form>
                    </div>
                    <!--//room-setting-->
                    <div class="mt-5 mb-5">
                        <a class="btn btn-lg btn-pointcolor col-md-8" href=${'/main_shooter_appView'} role="button">확인</a>
                    </div>
    
            </div>
            <!--//container-->
        </div>
        <!--//popup-bgimg-->
        </body>
    `

    function roomNameSave(e) {
        state.roomName = e.target.value;

        emit('updateRoomName');
    }
}