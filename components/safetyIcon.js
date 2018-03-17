var html = require('choo/html');

module.exports = safetyIcon;

function safetyIcon (value, onblur) {
    return html`
        <span class="safety"><em class=${ isSafety() } onblur=${ onblur }></em>${ safetyText() }</span>
    `

    function safetyText() {
        if (isSafety() == 'level00') {
            return '사용불가';
        }
        if (isSafety() == 'level01') {
            return '숫자 필요';
        }
        if (isSafety() == 'level02') {
            return '안전';
        }
        if (isSafety() == 'level03') {
            return '매우 안전';
        }

    }

    function isSafety () {
        var hasNumber = /\d/;
        if (value.length < 8) {
            return 'level00';
        }
        else {
            if (!hasNumber.test(value)) {
                return 'level01';
            }
            else {
                if (!upperCheck(value)) {
                    return 'level02';
                }
                else {
                    return 'level03';
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
}
