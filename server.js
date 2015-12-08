/* eslint no-console: 0 */
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import fs from 'fs';


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(express.static(__dirname + '/dist'));

if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

//get testdata json from file
var file = './app/model/testdata.json';
var jsondata = JSON.parse(fs.readFileSync(file, "utf8"));
//setup path for index.html
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



var server = app.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});



//create user array for usernames in chat
//user names will be mapped to their socket id
var users = [];

//use socket io from the server side.

var connections = [];
var title = 'Welcome user';

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    socket.once('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected: %s sockets remaining.", connections.length);
  });

  socket.emit('welcome', {
    title: title,
    chartData: jsondata
  });

  connections.push(socket);
    console.log("=> Connected: %s sockets connected.", connections.length);
});
console.log("=>Polling server is running at 'http://localhost:3000'");

