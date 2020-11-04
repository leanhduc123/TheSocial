const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const ioCreator = require("socket.io");
const http = require("http");

const fileExtensions = {
  "image/jpeg": ".jpg",
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "static"));
  },
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + "-" + Date.now() + fileExtensions[file.mimetype];
    req.savedFile = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: diskStorage });

mongoose.connect(
  "mongodb://10.1.8.202:27017/the_social",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("DB Connected!");
    }
  }
);

const router = require("./api");

const app = express();
const server = http.createServer(app);
const io = ioCreator(server);

let onlineUsers = [];
io.on("connection", (socket) => {
  socket.on('setOnline', (data) => {
    onlineUsers[socket.id] = data;
    io.emit('onlineCount', Object.keys(onlineUsers).map((key) => onlineUsers[key]));
  })
  socket.on('disconnect', () => {
    delete onlineUsers[socket.id];
  })
})
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(router);
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({ fileName: req.savedFile });
});

app.get("/onlineUsers", (req, res) => {
  res.json(onlineUsers);
})
app.use("/static", express.static(path.join(__dirname, "static")));

server.listen(5000, () => {
  console.log("Server is running");
});
