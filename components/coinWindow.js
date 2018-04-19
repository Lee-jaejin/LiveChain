var html = require('choo/html')

module.exports = coinWindow

function coinWindow () {
  return html`
    <!DOCTYPE html>
<html lang="ko">

<head>
    <title>SHOOTER</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="assets/styles/bootstrap.css">
    <link rel="stylesheet" href="assets/styles/bootstrap-reboot.css">
    <link rel="stylesheet" href="assets/styles/shoot.css">
    <!--[if lt IE 9]>
		<script src="assets/scripts/libs/html5shiv.min.js"></script>
	<![endif]-->
</head>

<body>
    <!-- Wrap -->
    <div class="wrap">

        <!-- 코인선물하기 -->
        <div class="sponsoring">
            <div class="header">
                <button type="button" class="close" aria-label="닫기" onclick="window.close()">
              <span aria-hidden="true">&times;</span>
            </button>
                <p>코인 선물하기</p>
            </div>

            <form>
                <div class="form-group">
                    <label>나의 계좌</label>
                    <select class="form-control" id="">
                        <option selected>계좌를 선택하세요.</option>
                        <option> ${ state.roomEntryAccount } </option>
                    </select>
                </div>
                <div class="form-group">
                    <label>받는 사람</label>
                    <select class="form-control" id="">
                      <option selected>계좌를 선택하세요.</option>
                      <option>0x12452fartkdsjfqt</option>
                      <option>0x12452fartkdsjfqt</option>
                      <option>0x12452fartkdsjfqt</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="w-100 pt-3">
                      <div class="balance pb-1"> <strong>My Wallet</strong> 1,523,242 <small>Live</small> </div>
                      후원 LIVE 
                    </label>
                    <div class="input-group coin">
                        <span class="input-group-addon" id=""><img src="assets/images/ic_shoot_coin.svg" class="coin"></span>
                        <input type="text" class="form-control" placeholder="금액을 입력하세요.">
                    </div>
                </div>
                <div class="form-group">
                    <label>메시지 입력</label>
                    <input type="text" class="form-control p-3" placeholder="메시지를 입력하세요.">
                </div>
            </form>

            <div class="btn-bottom">
                <a class="btn btn-lg btn-pointcolor2" href="main_keeper_coin_02.html" role="button">다음</a>
            </div>

        </div>
        <!-- //코인선물하기 -->

    </div>
    <!-- //wrap -->

</body>
<script>
    var {ipcRenderer} = require('electron');
    
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping'));
    ipcRenderer.on('asynchronous-reply', function (event, arg) {
      console.log(arg);
    })
    ipcRenderer.send('asynchronous-message', 'ping');
</script>
</html>

  `
}
