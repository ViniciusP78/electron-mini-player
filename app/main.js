const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    width:600,
    height:100,
    resizable: false,
    frame: false,
    transparent: true
  });

  mainWindow.loadFile(`${__dirname}/index.html`);

  // mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
})

OpenTrackFromUser = () => {
  const files = dialog.showOpenDialogSync({
    properties: ['openFile'],
    title: 'Open .mp3 Music',
    filters: [
      {name: 'MP3 File', extensions: ['mp3']},
      {name: 'FLAC File', extensions: ['flac']}
    ]
  });

  if (!files) return;

  const file = files[0];

  return file;
}

ipcMain.handle('open-track', (event, args) => {
  const trackURI = OpenTrackFromUser();
  return trackURI;
})

ipcMain.on('quit', (event) => {
  app.quit();
})