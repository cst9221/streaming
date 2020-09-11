const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer(undefined)
// const myPeer = new Peer(undefined, {
  // host: "/",
  // port: "3000",
// });
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};

// 클라이언트사용자의 mediaDevices를 가져옴
function getUserMediaDevices() {
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: false,
    })
    .then((stream) => {
      addVideoStream(myVideo, stream);
      myPeer.on("call", (call) => {
        // document.getElementById("video").id = myPeer.id
        call.answer(stream);
        const video = document.createElement("video");
        call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
        });
      });

      socket.on("user-connected", (userId) => {
        connectToNewUser(userId, stream);
      });

    });
}
function socketUserDisconnect() {
  socket.on("user-disconneted", (userId) => {
    if (peers[userId]) peers[userId].close();
  });
}
function socketUserConnect() {
  socket.on("user-connected", (userId) => {
    console.log("User connected : ", userId);
  });
}
// socket.emit('join-room', ROOM_ID, 10)

function peerOpen() {
  myPeer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id);
  });
}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

function init() {
  getUserMediaDevices();
  socketUserDisconnect();
  socketUserConnect();
  peerOpen();
}
init()
