// .mp4파일이 .m3u8, .ts파일로 생성됨
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// 웁션
ffmpeg("videos/video.mp4", { timeout: 432000 })
  .addOptions([
    "-profile:v baseline",
    "-level 3.0",
    "-start_number 0",
    "-hls_time 10", // 영상 분할단위
    "-f hls", // 포맷설정
  ])
  .output("videos/output.m3u8")
  .on("end", () => {
    console.log("end");
  })
  .run();

  module.exports = ffmpeg;