var {app, BrowserWindow} = require('electron');
var path = require('path');

var mainWin = null;
var subWin = null;
/*
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
*/
app.on('ready', function () {
  console.log('The application is ready.');

  mainWin = new BrowserWindow({
      width: 1024,
      height: 650,
      minWidth: 550,
      minHeight: 200
  });

  subWin = new BrowserWindow({
      show: true,
      width: 300,
      height: 200,
  });

  mainWin.loadURL('file://' + path.join(__dirname, 'index.html'));
  mainWin.openDevTools();
  mainWin.on('close', function () {
    mainWin = null;
  });

  subWin.loadURL('file://' + path.join(__dirname, './components/indexTwo.html'));
  subWin.on('close', function () {
    subWin = null;
  });
});