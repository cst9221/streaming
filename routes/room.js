const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidV4 } = require("uuid");

router.get("/", (req, res) => {
  res.redirect(`/room/${uuidV4()}`);
});

router.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

module.exports = router;

// 서버에 저장된 영상 스트리밍 서비스하기
// https://imkh.dev/5-nodejs-video-streaming-server/
// https://sukth09.tistory.com/42
