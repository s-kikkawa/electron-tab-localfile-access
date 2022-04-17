"use strct";

// Electronのモジュール
const electron = require("electron");

// アプリケーションをコントロールするモジュール
const app = electron.app;

// Passthrough is not supported, GL is disabled, ANGLE is
// ↑のメッセージがコンソールにでるのでハードウェアアクセラレーションを無効にする
app.disableHardwareAcceleration();

// ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;

const path = require('path');

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    // read-file.jsでrequireを使えるようにする。
    webPreferences: {
        nodeIntegration: false,
        enableRemoteModule: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'read-file.js')
    },
  });

  // メニューバーを消す
  mainWindow.setMenu(null);
  //使用するhtmlファイルを指定する
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
