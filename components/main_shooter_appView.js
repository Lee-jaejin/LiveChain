var html = require('choo/html')
var path = require('path')
var onload = require('on-load')

var mediaDevices = require('../lib/media-devices')
var broadcast = require('../lib/broadcast')

var imgPath = path.join(__dirname,'../assets/images/shooter_profile_01.png');
var $ = document.getElementById.bind(document)

module.exports = function (state, emit) {
  var div = html`
    <body>
    <!-- Wrap -->
    <div class="wrap">
        <!-- TopMenu -->
        <div id="topmenu" class="navbar navbar-dark topmenu">
            <a class="navbar-brand logo text-hide" href="#">SHOOTER</a>
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
            <!-- videobox -->
            <div class="videobox">
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
                            <dd class="name">GOODDAY 굿데이</dd>
                            <dt class="tit">임팩트있는 슛터! 굿데이의 괌 스트리트 라이딩</dt>
                            <dd class="hashtag" id="hashtag"><a href="">#괌</a><a href="">#GUAM</a><a href="">#롱보드</a><a href="">#괌여행</a><a href="">#여행</a><a href="">#제주항공</a><a href="">#롱보드여신</a><a href="">#JJ노마드</a></dd>
                            <dd class="detail">굿데이의 롱보드 여행기 괌 편 [JJ노마드] 롱보드와 함께 어디든지 떠난다! 지난 3년 동안 롱보드와 함께 19개국을 여행 다닌 롱보더, 트래블러 굿데이. 이번에는 괌이다! 괌에서 롱보드와 함께 자유로운 여행스토리를 전한다. 괌에서 즐겨보고 싶은 위시리스트를 작성한 굿데이. 자 이제 그럼 괌으로 출발!</dd>
                        </dl>
                    </div>
                </div>
                <!--  //liveinfo -->
            </div>
            <!-- //videobox -->

            <!-- chatbox -->
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

                <div class="sponsor">후원금</div>

                <!-- chat-live -->
                <div id="chat-live" class="chat-live">


                    <!-- 채팅채팅 -->
                    <div class="chat" id="">
                        chat
                    </div>
                    <!-- //채팅채팅 -->

                </div>
                <!-- //chat-live -->

                <div class="chat-input">입력</div>
                <div class="wallet">지갑</div>

            </div>
            <!-- //chatbox -->
        </div>
        <!-- //cntbox -->
    </div>
    <!-- //wrap -->

    </body>
    `

    // attach view lifecycle functions
    onload(div, load, unload)

    // return function to router
    return div

    // open media devices on entry
    function load() {
        var selected = state.sources.selected

        var video = selected.video
        var audio = selected.audio

        mediaDevices.start(video, audio, function (mediaStream) {
            window.stream = mediaStream
            $('player').volume = 0
            $('player').srcObject = mediaStream
        })
    }

    // stop media devices on exit
    function unload() {
        mediaDevices.stop()
    }

    // start broadcast
    function start() {
        var quality = state.quality
        broadcast.start(quality, window.stream, function (mediaRecorder, hash) {
            window.recorder = mediaRecorder
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
