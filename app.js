var {app, BrowserWindow} = require('electron');
var path = require('path');

var mainWin = null;

app.on('ready', function () {
  console.log('The application is ready.');

  mainWin = new BrowserWindow({
      minHeight:672,
      minWidth:1050,
      height:672,
      width:1050,
      webPreferences: {
          backgroundThrottling:false
      }
  });

  mainWin.loadURL('file://' + path.join(__dirname, 'index.html'));
  mainWin.openDevTools();
  mainWin.on('close', function () {
    mainWin = null;
  });
});