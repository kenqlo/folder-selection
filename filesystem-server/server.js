import Fastify from "fastify";
import { dialog, app, BrowserWindow } from "electron";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3001;

const fastify = Fastify({
  logger: true,
});

// Electron アプリの初期化
app.on("ready", () => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  fastify.get("/select-folder", async (req, res) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"],
    });

    if (result.canceled) {
      res.send({ canceled: true });
    } else {
      res.send({ canceled: false, filePath: result.filePaths[0] });
    }
  });

  fastify.listen({ port: PORT }, (err) => {
    console.log();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
