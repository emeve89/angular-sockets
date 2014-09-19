var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', 'socket', function($scope, socket) {
  $scope.messages = [];

  socket.on('new_user', function(data) {
    alert(data);
  });

  socket.on('get_message', function(data) {
    $scope.messages.push(data.message);
  });

  $scope.sendMessage = function() {
    socket.emit('send_message', { message: $scope.message });
    $scope.messages.push($scope.message);
    $scope.message = '';
  }
}]);

app.factory('socket', function() {
  var socket = io.connect('http://tag-node.herokuapp.com');

  return socket;
});
