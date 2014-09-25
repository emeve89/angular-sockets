var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', 'socket', function($scope, socket) {
  $scope.messages = [];

  socket.emit('join', 'TRADE-ID');

  socket.on('new_user', function(data) {
    $scope.messages.push(data.message);
    $scope.$apply();
  });

  socket.on('get_message', function(data) {
    $scope.messages.push(data.message);
    $scope.$apply();
    console.log($scope.messages);
  });

  $scope.sendMessage = function() {
    socket.emit('send_message', { message: $scope.message });
    $scope.messages.push($scope.message);
    $scope.message = '';
  }
}]);

app.factory('socket', function() {
  var socket = io.connect('http://5c216906.ngrok.com');

  return socket;
});
