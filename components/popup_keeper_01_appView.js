var html = require('choo/html')

module.exports = function (state, emit) {
    return html`
        <body class="popup-dark">
            <p class="close"><a href="javascript:frameclose()" class="text-hide">창닫기</a> </p>
    
            <div class=" popup-bgimg">
                <div class="container">   
                    <header class="header clearfix">
                        <h3 class="popup-title">On Air 방 입장</h3>
                        <h2 class="popup-logo text-hide">SHOOT</h2>
                    </header>
                    
                        <div class="keeper-entrance">
                            <h6 class="fw-light mb-3">주소를 알고 계신 경우 주소를 입력해주세요. </h6>
        
                            <form>
                                <div class="form-group mb-5 ">
                                    <label for="">주소 입력</label>
                                    <div class="input-group">
        
                                        <input type="text" class="form-control form-control-lg" placeholder="주소를 입력하세요.">
                                        <span class="input-group-btn">
                                            <button class="btn btn-ent btn-lg" type="button">입장</button>
                                        </span>
                                    </div>
                                </div>
        
                                <h6 class="fw-light mb-3">주소를 모르는 경우 On Air List 채널로 이동합니다.  </h6>
                                <p class="fw-light text-muted"> 다양한 라이브 방송을 만나보세요.  </p>
                            </form>
                        </div>
                        <!--//keeper-entrance-->
                        <div class="mb-5">
                            <a class="btn btn-lg btn-pointcolor w-100" href=${'/main_shoot_onairlist'} role="button"> On Air List 채널로 이동</a>
                        </div>
        
                </div>
                <!--//container-->
            </div>
            <!--//popup-bgimg-->
        </body>
    `
}