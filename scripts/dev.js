import path from "path";
import electronPath from "electron";
import { spawn } from "child_process";
import { createServer, build } from "vite";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const sharedOptions = {
  mode: "dev",
  build: {
    watch: {},
  },
};

const renderDev = {
  async createRenderServer() {
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/render.js"),
    };
    this.server = await createServer(options);
    await this.server.listen();
    this.server.printUrls();
    return this.server;
  },
};

const preloadDev = {
  async createRenderServer(viteDevServer) {
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/preload.js"),
    };
    return build({
      ...options,
      plugins: [
        {
          name: "reload-page-on-preload-package-change",
          writeBundle() {
            viteDevServer.ws.send({
              type: "full-reload",
            });
          },
        },
      ],
    });
  },
};


const workDev = {
  async createRenderServer(viteDevServer) {
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/work.js"),
    };
    return build({
      ...options,
      plugins: [
        {
          name: "reload-page-on-work-package-change",
          writeBundle() {
            viteDevServer.ws.send({
              type: "full-reload",
            });
          },
        },
      ],
    });
  },
};

let spawnProcess = null;

const mainDev = {
  async createMainServer(renderDevServer) {
    const protocol = `http${renderDevServer.config.server.https ? "s" : ""}:`;
    const host = renderDevServer.config.server.host || "localhost";
    const port = renderDevServer.config.server.port;
    process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}/`;
    process.env.VITE_CURRENT_RUN_MODE = "main";
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, "../config/vite/main.js"),
    };
    return build({
      ...options,
      plugins: [
        {
          name: "reload-app-on-main-package-change",
          writeBundle() {
            if (spawnProcess !== null) {
              spawnProcess.kill("SIGINT");
              spawnProcess = null;
            }

            spawnProcess = spawn(String(electronPath), ["."]);

            spawnProcess.stdout.on("data", (d) => {
              const data = d.toString().trim();
              console.log(data);
            });

            spawnProcess.stderr.on("data", (data) => {
              console.error(`stderr: ${data}`);
            });
          },
        },
      ],
    });
  },
};

const initDev = async () => {
  try {
    const renderDevServer = await renderDev.createRenderServer();
    await preloadDev.createRenderServer(renderDevServer);
    await workDev.createRenderServer(renderDevServer);
    await mainDev.createMainServer(renderDevServer);
  } catch (err) {
    console.error(err);
  }
};

initDev();
