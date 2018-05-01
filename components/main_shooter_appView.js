var html = require('choo/html');
var path = require('path');
var onload = require('on-load');
var chatBox = require('./components/chatBox');
var localServer = require('http-server');

var mediaDevices = require('../lib/media-devices');
var broadcast = require('../lib/broadcast');

var imgPath = path.join(__dirname,'../assets/images/shooter_profile_01.png');
var $ = document.getElementById.bind(document);

module.exports = function (state, emit) {
    var div = html`
        <body>
        <!-- Wrap -->
        <div class="wrap">
            <!-- TopMenu -->
            <div id="topmenu" class="navbar navbar-dark topmenu">
                <a class="navbar-brand logo text-hide" href=${'/popup_usermode_appView'}>SHOOTER</a>
                <!-- menu -->
                <div id="menu" class="menu">
                    <ul>
                        <li class="search"><a href="javascript:;">검색</a></li>
                        <li class="user"><a href="javascript:;"> 채팅숨기기</a></li>
                        <li class="drawer"><a href="javascript:;"> 리스트</a></li>
                    </ul>
                </div>
            </div>
            <!-- //TopMenu-->
            <!-- CNT Box -->
            <div id="cntbox" class="cntbox rightbox">
                <div class="onair">
                    <div class="onoffswitch" onclick=${ state.live ? stop : start }>
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
                        <label class="onoffswitch-label" for="myonoffswitch">
                            <span class="onoffswitch-inner" ></span>
                            <span class="onoffswitch-switch" ></span>
                        </label>
                    </div>
                </div>
            
                <!-- videobox -->
                <div class="videobox" onload=${ loadChatServer }>
                    <!-- Video Player -->
                    <div class="shootplayer_wrap">
                        <div class="shootplayer_content">
                            <div id="shoot_player" class="prad mouseover" style="cursor: default;">
                                <!-- Video 사이즈 비율 -->
                                <div class="shoot_player_size"></div>
                                <!-- Video 소스  -->
                                <div id="video_layer">
                                    <video id="player" autoplay></video>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- //Video Player -->
    
                    <!--  liveinfo -->
                    <div id="liveinfo" class="liveinfo">
                        <!-- 방송정보 -->
                        <div id="broad_info" class="info">
                            <div class="shooter_logo">
                                <img src=${imgPath} alt="SHOOTER 로고" class="thum">
                            </div>
                            <dl class="shooter">
                                <dd class="name">${ state.roomEntryAccount }</dd>
                                <input value=${ state.hash }>
                                <dt class="tit">${ state.roomName }</dt>
                                <dd class="hashtag" id="hashtag"><a href="">#괌</a><a href="">#GUAM</a><a href="">#롱보드</a><a href="">#괌여행</a><a href="">#여행</a><a href="">#제주항공</a><a href="">#롱보드여신</a><a href="">#JJ노마드</a></dd>
                                <dd class="detail">굿데이의 롱보드 여행기 괌 편 [JJ노마드] 롱보드와 함께 어디든지 떠난다! 지난 3년 동안 롱보드와 함께 19개국을 여행 다닌 롱보더, 트래블러 굿데이. 이번에는 괌이다! 괌에서 롱보드와 함께 자유로운 여행스토리를 전한다. 괌에서 즐겨보고 싶은 위시리스트를 작성한 굿데이. 자 이제 그럼 괌으로 출발!</dd>
                            </dl>
                        </div>
                    </div>
                    <!--  //liveinfo -->
                </div>
                <!-- //videobox -->
                ${ chatBox(state.roomEntryAccount) }
            </div>
            <!-- //cntbox -->
        </div>
        <!-- //wrap -->
        
        <script>
        var remote = require('electron').remote;
        
        remote.getCurrentWindow().setFullScreen(true); // height appear -12pixel.
        </script>
        </body>
        `

    // attach view lifecycle functions
    onload(div, load, unload);

    // return function to router
    return div;

    // open media devices on entry
    function load() {
        var selected = state.sources.selected;

        var video = selected.video;
        var audio = selected.audio;

        mediaDevices.start(video, audio, function (mediaStream) {
            window.stream = mediaStream;
            $('player').volume = 0;
            $('player').srcObject = mediaStream;
        })
    }

    // stop media devices on exit
    function unload() {
        mediaDevices.stop()
    }

    // start broadcast
    function start() {
        var quality = state.vquality;
        broadcast.start(quality, window.stream, function (mediaRecorder, hash) {
            window.recorder = mediaRecorder;
            emit('liveToggle', {live: true, hash: hash})
        })
    }

    // stop broadcast
    function stop() {
        broadcast.stop(window.recorder, function () {
            emit('liveToggle', false)
        })
    }
}
