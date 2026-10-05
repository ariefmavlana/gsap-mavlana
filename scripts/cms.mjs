import { spawn } from "node:child_process";
const child = spawn(
  process.execPath,
  ["node_modules/decap-server/dist/index.js"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      BIND_HOST: "127.0.0.1",
      ...(process.env.CMS_ORIGIN ? { ORIGIN: process.env.CMS_ORIGIN } : {}),
      PORT: "8081",
    },
  },
);
child.on("exit", (code) => process.exit(code ?? 1));
