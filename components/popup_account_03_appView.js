var html = require('choo/html')

module.exports = function (state, emit) {
    return html`
<body class="popup-dark">
    <p class="close"><a href="javascript:frameclose()" class="text-hide">창닫기</a> </p>
    <div class=" popup-bgimg">
        <div class="container">
           
            <header class="header clearfix">
                <h3 class="popup-title">Account 개설하기</h3>
                <h2 class="popup-logo text-hide">SHOOT</h2>
            </header>

                <div class="account-add">
                    <h6 class="fw-light mb-3">Account address가 생성되었습니다. </h6>

                    <div class="card">
                        <div class="card-body">
                            0x15fs8w2cqw3492582aefae
                        </div>
                    </div>
                </div>

                <div class="mt-5 mb-5">
                    <a class="btn btn-lg btn-pointcolor col-md-8" href=${ '/popup_account_04_appView' } role="button">확인</a>
                </div>
            
        </div>
        <!--//container-->
    </div>
    <!--//popup-bgimg-->
</body>
`
}