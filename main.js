const { app, BrowserWindow } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

// Enable live reloading during development
try {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });
} catch (err) {
  // Ignore error if electron-reload is not installed (e.g. in production)
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'images/LOGO.jpg')
  });

  win.loadFile('index.html');
  
  // Update handling
  autoUpdater.on('update-available', () => {
    console.log('Update available.');
  });
  autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
  });

  autoUpdater.checkForUpdatesAndNotify();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
