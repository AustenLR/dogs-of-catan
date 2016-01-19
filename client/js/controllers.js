app.controller('AuthCtrl', AuthCtrl);
app.controller('LoginCtrl', LoginCtrl);
app.controller('GamesCtrl', GamesCtrl);
app.controller('GameCtrl', GameCtrl);

AuthCtrl.$inject = [
"$scope", 
"$location", 
"AuthService"
];

LoginCtrl.$inject = [
"$scope", 
"$location", 
"AuthService"
];

GamesCtrl.$inject = [
"$scope", 
"$location", 
"GameService", 
"games", 
"currentUser"
];

GameCtrl.$inject = [
"$scope", 
"$location", 
"GameService", 
"MessageService", 
"game", 
"messages", 
"currentUser"
];


function AuthCtrl($scope, $location, AuthService)
{
  $scope.createUser = function (inputs) {
    $scope.message = null;
    $scope.error = null;
    
    AuthService.signup(inputs)
    .then(function () {
      AuthService.login(inputs)
      .then(function (authData) {
        AuthService.setCurrentUser(authData);
        $location.path('/games');
      })
      .catch(function (error) {
        $scope.error = error;
      });
    })
    .catch(function (error) {
      $scope.error = error;
    });
  };
}

function LoginCtrl($scope, $location, AuthService) {
  $scope.login = function (inputs) {
    $scope.message = null;
    $scope.error = null;
    
    AuthService.login(inputs)
    .then(function (authData) {
      AuthService.setCurrentUser(authData);
      $location.path('/games');
    })
    .catch(function (error) {
      $scope.error = error;
    });
  };
}

function GamesCtrl($scope, $location, GameService, games, currentUser) {
  $scope.games = games;
  $scope.currentUser = currentUser;
  $scope.joinGame = function (gameKey) {
    GameService.joinGame(gameKey);
    $location.path("/games/"+gameKey);
  };
  $scope.createGame = function(name) {
    GameService.createGame(name) //returns a promise
    .then(function (game) {
      GameService.joinGame(game.key()); //resolving the promise then updating the database to joining that game
      $location.path("/games/"+game.key()); //redirecting the game
    });
  };
}

function GameCtrl($scope, $location, GameService, MessageService, game, messages, currentUser) {
  build = {

  };

  $scope.game = game;
  $scope.messages = messages;
  $scope.createMessage = createMessage;
  $scope.leaveGame = leaveGame;

  function createMessage(message) {
    MessageService.createMessage(game.$id, currentUser, message);
  }

  function leaveGame() {
    GameService.leaveGame(game.$id, currentUser);
    $location.path("/games");
  }

}
