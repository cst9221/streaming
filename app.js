const express = require("express");
const app = express();

const path = require("path");
const createError = require("http-errors"); // 상황에 맞는 에러를 보내줌
const cookieParser = require("cookie-parser"); // 쿠키생성에 사용
const logger = require("morgan"); // 로그 기록을 돕는 모듈
const server = require("http").Server(app);
const io = require("socket.io")(server);

const indexRouter = require("./routes/index");
const roomRouter = require("./routes/room");

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log(roomId, userId);
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("socketio", io); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.use("/", indexRouter);
app.use("/room", roomRouter);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log('io.oi',roomId, userId);
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconneted", userId);
    });
  });
});

server.listen(3000, function () {
  console.log("port 3000 open");
});

module.exports = app;
