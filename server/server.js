var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');
var clientPath = path.join(__dirname, '../client');
var port = process.env.PORT || 3000;
var circleArr = [];

app.use(express.static(clientPath));

app.get("/", function(req,res){

});

io.on('connection', function (socket) {
  console.log("a user connected");

  socket.on('loc', function(location){

   socket.broadcast.emit('loc',location);
 });

 socket.on("color", function(color){
 socket.broadcast.emit('color',color);
 });

 socket.on('signup', function (data) {
   console.log(data);
   socket.userName = data.name;
   color = data.color;
    socket.emit('joined', color);

 });

  socket.on("disconnect", function(){
  console.log('User disconnected');
  });

});


server.listen(port, function () {
  console.log("listening on port " + port);
});
