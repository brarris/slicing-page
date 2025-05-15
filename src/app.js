const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const browserSync = require("browser-sync").create();
browserSync.init({
  proxy: `http://localhost:${port}`, // Proxy ke server Express
  files: ["src/*.html", "src/*.css", "src/*.js"], // Monitor file HTML, CSS, dan JS
  open: false, // Jangan buka browser otomatis
  notify: false, // Matikan notifikasi BrowserSync
});

// Restart BrowserSync jika server Express restart
server.on("close", () => {
  browserSync.exit();
});
