var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , routes = require('./routes')
  , socket = require('./routes/socket.js')
  , io = require('socket.io').listen(server);



// Heroku config only
if(process.env.PORT) {
  io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
  });  
}


// Configuration
var config = require('./config')(app, express);


// Routes
app.get('/', routes.index);
app.get('/client', routes.client);
app.get('/command', routes.commandCenter);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', '*');

  // Pass to next layer of middleware
  next();
});

// Socket.io Communication
io.sockets.on('connection', socket);

// Start server
var port = process.env.PORT || 5001;

server.listen(port);