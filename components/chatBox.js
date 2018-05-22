var html = require('choo/html');
var hyperChat = require('@e-e-e/hyperchat');
var chat = new hyperChat(state.shooterName);
var path = require('path');
var imgPath = path.join(__dirname,'../assets/images/ic_shoot_coin.svg');
var imgPathDefault = path.join(__dirname, '../assets/images/shooter_profile_default.png');
var imgPath01 = path.join(__dirname, '../assets/images/shooter_profile_01.png');

module.exports = chatBox;

function chatBox (account) {
    return html`
            <div class="chatbox">
                <!-- 제목 -->
                <h2>채팅 <span>287</span></h2>
                <!-- //제목 -->
                <!-- 헤드버튼 -->
                <div id="headbtn" class="headbtn">
                    <ul>
                        <li class="refresh"><a href="javascript:;">새로고침</a></li>
                        <li class="closed"><a href="javascript:;"> 채팅숨기기</a></li>
                    </ul>
                </div>

                <!-- 후원금표시 -->
                <div class="sponsor">
                    <div class="spon-box spon-lv01">
                        <div class="spon-info">
                            <img src=${ imgPathDefault } alt="User Avatar" class="img-circle" />
                            <span><img src=${ imgPath } class="coin"></span>
                            <p class="amount">500,000</p>
                            <small>LIVE</small>
                        </div>
                    </div>
                    <div class="spon-box spon-lv02">
                        <div class="spon-info">
                            <img src="http://placehold.it/27/71cbf5/fff&text=U" alt="User Avatar" class="img-circle" />
                            <span><img src=${ imgPath } class="coin"></span>
                            <p class="amount">50,000</p>
                            <small>LIVE</small>
                        </div>
                    </div>
                    <div class="spon-box spon-lv04">
                        <div class="spon-info">
                            <img src="http://placehold.it/27/a4c218/fff&text=U" alt="User Avatar" class="img-circle" />
                            <span><img src=${ imgPath } class="coin"></span>
                            <p class="amount">3,000</p>
                            <small>LIVE</small>
                        </div>
                    </div>
                    <div class="spon-box spon-lv05">
                        <div class="spon-info">
                            <img src=${ imgPathDefault } alt="User Avatar" class="img-circle" />
                            <span><img src=${ imgPath } class="coin"></span>
                            <p class="amount">1,000</p>
                            <small>LIVE</small>
                        </div>
                    </div>
                </div>
                <!-- //후원금표지 -->
                
                <!-- chat-live -->
                <div id="chat-live" class="chat-live">
                    <!-- 채팅채팅 -->
                    <div class="chat-box" id="">

                        <div class="panel-body">
                            <ul class="chat">
                                <li class="left clearfix">
                                    <span class="chat-img"><img src=${ imgPathDefault } alt="User Avatar" class="img-circle" /></span>
                                    <div class="chat-body clearfix">
                                        <div class="user-info">
                                            <em class="name">김윤건</em>
                                            <small class="text-muted"> 21:14 </small>
                                        </div>
                                        <p>인사 한번만 해주세요....</p>
                                    </div>
                                </li>
                                <li class="right clearfix">
                                    <span class="chat-img"><img src=${ imgPath01 } alt="User Avatar" class="img-circle" /></span>
                                    <div class="chat-body clearfix">
                                        <div class="user-info">
                                            <em class="name">GOODDAY</em>
                                            <small class="text-muted"> 5초전</small>
                                        </div>
                                        <p>굿데이에요. 모두모두 오늘도 너무너무 반가워요. </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- //채팅채팅 -->

                </div>
                <!-- //chat-live -->
                <!-- 채팅입력 -->
                <div class="chat-input">
                    <div class="input-group">
                        <a onclick=${ coinModalWindow } class="chat-coin"><img src=${ imgPath } class="coin"></a>
                        <input type="text" id="message" class="form-control chat-text" placeholder="대화를 나눠보세요." onblur=${ getMessage }>
                        <button class="btn text-hide" type="button" onclick=${ sendMessage }><sapn class="chat-btn">입력</sapn></button>
                    </div>
                </div>
                <!-- //채팅입력 -->
                <!-- MY Wallet -->
                <div class="wallet">
                    <p>My Wallet</p>
                    <div class="balance"><span>${ web3.fromWei(web3.eth.getBalance(account), 'ether').toString(10) }<small>LIVE</small></span></div>
                    <div class="account"> <span>ACCOUNT</span> ${ account } </div>
                </div>
                <!-- //MY Wallet -->
            </div>
    `;
    
    function sendMessage() {
        var messageTaking = document.getElementById("message").value;

        chat.chat(messageTaking);
    }

    function getMessage() {
        var messageTaking = document.getElementById("message").value;
        
        console.log(messageTaking);
    }

    function loadTextChat () {
        chat.on('ready', function () {
            chat.add();
            //console.log(chat.name, 'now available on public key', chat.key);
        })
    }

    // coinWindow
    function coinModalWindow () {
        const {BrowserWindow} = require('electron').remote;

        var coinWindow = new BrowserWindow({
            width : 348,
            height : 470,
            resizable : false,
            frame : false,
        });
        coinWindow.show();
        coinWindow.on('close', function () {
            coinWindow = null;
        });

        coinWindow.loadURL('file://' + path.join(__dirname,'./main_keeper_coin.html'));
    }
}