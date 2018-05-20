var {app, BrowserWindow, ipcMain} = require('electron');
var path = require('path');

var mainWin = null;

app.on('ready', function () {
  console.log('The application is ready.');

  mainWin = new BrowserWindow({
      minHeight:672,
      minWidth:1050,
      height:672,
      width:1050,
      center:true,
      webPreferences: {
          backgroundThrottling:false,
          nodeIntegration:true
      }
  });

  mainWin.loadURL('file://' + path.join(__dirname, '/index.html'));
  mainWin.openDevTools();
  mainWin.on('close', function () {
    mainWin = null;
  });
});

ipcMain.on('asynchronous-message', function (event, arg) {
    console.log(arg);

    event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', function (event, arg) {
    console.log(arg);
    event.returnValue = 'pong2';
});

ipcMain.on('synchronous-message2', function (event, arg) {
    console.log(arg);
    event.returnValue = 'got it!';
});