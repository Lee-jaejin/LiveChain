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
            
                <div class="account-add">
                    <h5 class="fw-light">현재 Account가 없습니다. </h5>
                    <h1 class="fw-light">개설 하시겠습니까?</h1>
                </div>
                <div class="btn-ic mt-5 mb-5">
                    <a class="btn btn-lg btn-pointcolor" href="javascript:frameclose()" role="button"><em></em>괜찮습니다</a>
                    <a class="btn btn-lg btn-pointcolor" href=${ '/popup_account_02_appView' } role="button"><em></em>개설 하겠습니다</a>
                </div>
                <p class="script">Account를 생성하지 않으면, 프로그램은 자동 종료됩니다.</p>

        </div>
        <!--//container-->
    </div>
    <!--//popup-bgimg-->

</body>
`
}