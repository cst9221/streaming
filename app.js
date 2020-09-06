const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const port = 5000;
const server = app.listen(port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

new hls(server, {
  provider: {
    exists: (req, cd) => {
      const ext = req.url.split('.').pop();

      // 파일이 존재할 때 null, true 리턴
      if (ext !== 'm3u8' && ext !== 'ts'){
        return cd(null, true);
      }

      fs.access(__dirname + req.url, fs. constants.F_OK, function (err){
        if (err){
          console.log('File not exist');
          return cd(null, false);
        }
        cd(null, true);
      });
    },
    // .m3u8파일에 대한 요청일 때 실행
    getManifestStream: (req, cd) => {
      const stream = fs.createReadStream(__dirname + req.url);
      cd(null, stream);
    },
    // .ts파일에 대한 요청일 때 실행
    getaSegmentStream: (req, cd) =>{
      const stream = fs.createReadStream(__dirname + req.url);
      cd(null, stream);
    }
  }
})