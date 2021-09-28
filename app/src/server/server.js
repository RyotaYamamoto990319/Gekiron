var express = require('express');
var path = require('path');

var webSocket = require('./room');
var testRouter = require('./api/test');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('./', 'dist')));

app.use('/api/', testRouter);

app.get('*', function (req, res) {
  res.sendFile(path.resolve('./', 'dist', 'index.html'))
})

var server = app.listen(3000, ()=> {
  console.log('server running');
})

webSocket(server);