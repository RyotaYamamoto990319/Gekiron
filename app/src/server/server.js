var express = require('express');
var path = require('path');

var webSocket = require('./room');
var signupRouter = require('./api/signup');
var themeRouter = require('./api/theme');
var answerRouter = require('./api/answer');
var usernameRouter = require('./api/username');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./', 'dist')));

app.use('/api/signup', signupRouter);
app.use('/api/theme', themeRouter);
app.use('/api/answer', answerRouter);
app.use('/api/username', usernameRouter);


app.get('*', function (req, res) {
  res.sendFile(path.resolve('./', 'dist', 'index.html'))
})

var server = app.listen(3000, ()=> {
  console.log('server running');
})

webSocket(server);