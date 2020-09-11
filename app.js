const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const indexRouter = require("./routes/index");
const roomRouter = require("./routes/room");

app.set('io', io)
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/room", roomRouter);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => { // join-room요청?이 왔을때
    console.log('server.js io.on : room - ',roomId,'| user - ', userId);
    socket.join(roomId); // room 접속
    socket.to(roomId).broadcast.emit("user-connected", userId); // 자신을 제외한 user들에게

    socket.on("disconnect", () => { // 연결이 끊겼을 때
      socket.to(roomId).broadcast.emit("user-disconneted", userId);
    });
  }); 
});

server.listen(3000, ()=>{
  console.log('port 3000 open')
});

// 유투브 - peerjs와 socket.io를 이용한 스트리밍 뼈대
// https://www.youtube.com/watch?v=DvlyzDZDEq4&t=440s


// const express = require("express");
// const app = express();

// const path = require("path");
// const createError = require("http-errors"); // 상황에 맞는 에러를 보내줌
// const cookieParser = require("cookie-parser"); // 쿠키생성에 사용
// const logger = require("morgan"); // 로그 기록을 돕는 모듈
// const server = require("http").Server(app);
// const io = require("socket.io")(server);

// const indexRouter = require("./routes/index");
// const roomRouter = require("./routes/room");

// io.on("connection", (socket) => {
//   socket.on("join-room", (roomId, userId) => {
//     console.log(roomId, userId);
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)
//   });
// });

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.set("socketio", io); 

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.engine("html", require("ejs").renderFile);

// app.use("/", indexRouter);
// app.use("/room", roomRouter);

// io.on("connection", (socket) => {
//   socket.on("join-room", (roomId, userId) => { // join-room요청?이 왔을때
//     console.log('server.js io.on : room - ',roomId,'| user - ', userId);
//     socket.join(roomId); // room 접속
//     socket.to(roomId).broadcast.emit("user-connected", userId); // 자신을 제외한 user들에게

//     socket.on("disconnect", () => { // 연결이 끊겼을 때
//       socket.to(roomId).broadcast.emit("user-disconneted", userId);
//     });
//   });
// });
// server.listen(3000, ()=>{
//   console.log('port 3000 open')
// });

// // module.exports = app;
