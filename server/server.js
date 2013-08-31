var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var player_count = 0

io.sockets.on('connection', function (socket) {
	player_count += 1
	socket.emit('connected', player_count);
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('player one connected', function (data) {
  	console.log(data);
  	if (data == 'true')
  	{
  		io.sockets.emit('player one init', 'true');
  	}
  });
  socket.on('player two connected', function (data) {
  	console.log(data);
  	if (data == 'true')
  	{
  		io.sockets.emit('player two init', 'true');
  	}
  });

  console.log("SOCKETS: " + io.sockets)

});
