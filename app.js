var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const multer  = require('multer');

var storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + unique + path.extname(file.originalname))

  }
})

var upload = multer({ storage: storage });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galleryRouter = require('./routes/gallery')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'statics')))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gallery', galleryRouter)

app.post("/upload", upload.single('file'), (req, res) => {
  console.log("got post")
  const image = req.file
  console.log(image)
  res.status(200).send("Success")
  //console.log(req.query.name)
})

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
