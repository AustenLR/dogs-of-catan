app.controller("AuthCtrl", ["$scope", "$location", "AuthService",
  function ($scope, $location, AuthService) {

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
]);

app.controller("LoginCtrl", ["$scope", "$location", "AuthService",
  function ($scope, $location, AuthService) {
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
]);


app.controller("GamesCtrl", ["$scope", "$location", "GameService", "games", "currentUser",
  function ($scope, $location, GameService, games, currentUser) {
    $scope.games = games;
    $scope.currentUser = currentUser;
    $scope.joinGame = function (gameKey, user){
      GameService.joinGame(gameKey, user);
      $location.path("/games/"+gameKey);
    };
    $scope.createGame = function(name, currentUser){
      GameService.createGame(name, currentUser) //returns a promise
      .then(function (game) {
        GameService.joinGame(game.key(), currentUser); //resolving the promise then updating the database to joining that game
        $location.path("/games/"+game.key()); //redirecting the game
      });
    };
  }
]);

app.controller("GameCtrl", GameCtrl);
GameCtrl.$inject = ["$scope", "$location", "GameService", "MessageService", "game", "messages", "currentUser"];

function GameCtrl($scope, $location, GameService, MessageService, game, messages, currentUser) {
  game.length = Object.keys(game.players).length;

  build = {

  };

  $scope.game = game;
  $scope.messages = messages;
  $scope.createMessage = createMessage;
  $scope.leaveGame = leaveGame;

  debugger

  function createMessage(message) {
    MessageService.createMessage(game.$id, currentUser, message);
  }

  function leaveGame() {
    GameService.leaveGame(game.$id, currentUser);
    $location.path("/games");
  }

}