var html = require('choo/html');
var input = require('./components/input');
var safetyIcon = require('./components/safetyIcon');

var $ = document.getElementById.bind(document);

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
        
                        <form name="psForm" action="popup_account_02_appView.js">
                            <div class="form-group">
                                <label for="">비밀번호</label>
                                    <div class="form-inline">
                                        ${ input(state.accountPS, "영어, 숫자 혼합 8자리 이상", reRender) }
                                        ${ safetyIcon(state.accountPS, reRender) }
                                        <!--level00~level03까지 4단계-->
                                    </div>
                            </div>
                            <div class="form-group mb-4">
                                <label for="">비밀번호 확인</label>
                                ${ input(state.temp, "다시 한번 입력해주세요. ", psSameCheck) }
                            </div>

                            <small id="" class="form-text text-muted"> SHOOT은 귀하의 정보를 보관하지 않습니다. 계정에 엑세스하거나 비밀번호를 재설정하거나, 트랜잭션을 되돌릴 수 없습니다. 비밀번호 및 Account Address를 보호하고, 항상 확인하십시오. 귀하의 보안은 귀하의 책임입니다. </small>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input"> 동의합니다.
                            </div>
                        </form>
                        
                    </div>
                    <!--//account-add-->
                        
                    <div class="mt-5 mb-5">
                        <a class="btn btn-lg btn-pointcolor col-md-8" role="button" onclick=${ psValidation } >확인</a>
                    </div>
        
                </div>
                <!--//container-->
            </div>
            <!--//popup-bgimg-->

        </body>
        `
    function reform () {
        window.alert('비밀번호는 영문, 숫자 조합 8자리 이상으로 만들어주세요.\n');
        emit('account02');
    }

    function psValidation () {
        var hasNumber = /\d/;
        if (state.accountPS.length < 8) {
            return reform();
        }
        else {
            if (!hasNumber.test(state.accountPS)) {
                return reform();
            }
            else {
                if (!upperCheck(state.accountPS)) {
                    emit('account03');
                }
                else {
                    emit('account03');
                }
            }
        }
    }

    function upperCheck(value) {
        var lower = value.toLowerCase();
        if (value != lower) {
            return true;
        }
        return false;
    }

    function reRender (e) {
        state.accountPS = e.target.value;

        emit('updateAccountHash');
    }

    function psSameCheck(e) {
        state.temp = e.target.value;

        if (state.accountPS == state.temp) {}
        else {
            window.alert('Password not matched!');
        }
    }
}