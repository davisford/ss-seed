// My SocketStream 0.3 app

var express = require('express'),
  conf = require('./conf'),
  ss = require('socketstream'),
  fs = require('fs'),
  path = require('path');

var server, app = express(),
  RouteDir = 'server/routes',
  files = fs.readdirSync(RouteDir);

// Code Formatters
ss.client.formatters.add(require('ss-jade'));
ss.client.formatters.add(require('ss-stylus'));
// Use server-side compiled Hogan (Mustache) templates. Others engines available
ss.client.templateEngine.use(require('ss-hogan'));

// Define a single-page client called 'main'
ss.client.define('main', {
  view: 'app.jade',
  css:  ['libs', 'app.styl'],
  code: ['libs', 'app'],
  tmpl: '*'
});

// Minimize and pack assets if you type: SS_ENV=production node app.js
if (ss.env === 'production') ss.client.packAssets();

// add ExpressJS routes
files.forEach(function (file) {
  var filePath = path.resolve('./', RouteDir, file),
    route = require(filePath);
  console.log('Adding ExpressJS routes found in: %s', filePath);
  route.init(app, ss);
});

// catch-all route for everything else
app.get('/*', function (req, res) {
  res.serveClient('main');
});

server = app.listen(conf.webserver.port, function () {
  console.log('server listening on port %d in mode: %s', conf.webserver.port, app.settings.env);
});
ss.start(server);

// you need bodyParser if you do POST to express
ss.http.middleware.prepend(ss.http.connect.bodyParser());
// append socketstream middleware to express stack
app.stack = ss.http.middleware.stack.concat(app.stack);

process.on('uncaughtException', function (err) {
  console.log('uncaught error => ', err);
});
