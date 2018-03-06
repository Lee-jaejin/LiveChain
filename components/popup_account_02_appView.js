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
                    <h6 class="fw-light mb-3">안전한 비밀번호를 입력해주세요. </h6>

                    <form>
                        <div class="form-group">
                            <label for="">비밀번호</label>
                            <div class="form-inline">
                                <input type="password" class="form-control form-control-lg col-md-7" id="" placeholder="영어, 숫자 혼합 6자리 이상">
                                <span class="safety"><em class="level02"></em>안전</span>
                                <!--level00~level03까지 4단계-->
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <label for="">비밀번호 확인</label>
                            <input type="password" class="form-control form-control-lg col-md-7" id="" placeholder="다시 한번 입력해주세요. ">

                        </div>
                        <small id="" class="form-text text-muted"> SHOOT은 귀하의 정보를 보관하지 않습니다. 계정에 엑세스하거나 비밀번호를 재설정하거나, 트랜잭션을 되돌릴 수 없습니다. 비밀번호 및 Account Address를 보호하고, 항상 확인하십시오. 귀하의 보안은 귀하의 책임입니다. </small>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input"> 동의합니다.
                        </div>
                    </form>
                </div>
                <!--//account-add-->
                <div class="mt-5 mb-5">
                    <a class="btn btn-lg btn-pointcolor col-md-8" href=${ '/popup_account_03_appView' } role="button">확인</a>
                </div>

        </div>
        <!--//container-->
    </div>
    <!--//popup-bgimg-->

</body>
`
}