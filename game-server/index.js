var io = require('socket.io')(4002);
var _ = require('lodash');

var players = [];

io.on('connection', function(socket){ 

  console.log('new connection');

  socket.on('message', function(message){
    // console.log(message);
    io.emit('message', players);
  });

  socket.on('input', function(input){
    console.log(input);
    handleInput(input);
    io.emit('message', players);
  });
});

var handleInput = function(input) {
  if (_.filter(players, {id: input.id}).length > 0) {
    console.log('player already in game');
    _.remove(players, function(player) {
      return player.id == input.id;
    });
    players.push(input);
  }else {
    players.push(input);
  }
  io.emit('message', players);
};


