import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    title: "Neon Cannes",
    width: 1200,
    minWidth: 500,
    height: 800,
    minHeight: 500,
    movable: true,
    frame: false,
    icon: path.join('src', 'assets', 'NeonMovies.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: true,
      contextIsolation: false
    },
  })

  win.menuBarVisible = false;

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

const filePath = path.join(__dirname, '..', 'public', 'films.json');

ipcMain.handle('read-json', async () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
});

ipcMain.handle('write-json', async (_, content) => {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  return { status: 'success' };
});

ipcMain.handle('add-json', async (_, categoryName) => {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const newCategory = {
    position: data.length,
    category: categoryName,
    films: []
  };

  data.push(newCategory);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  return { status: 'success' };
});

ipcMain.on("minimize", () => {
  win?.minimize();
});

ipcMain.on("close", () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)