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
"MessageService", 
"games", 
"mainMessages", 
"currentUser"
];

GameCtrl.$inject = [
"$scope", 
"$location", 
"GameService", 
"MessageService", 
"game", 
"roomMessages",
"mainMessages",
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

function GamesCtrl($scope, $location, GameService, MessageService, games, mainMessages, currentUser) {
  $scope.games = games;
  $scope.mainMessages = mainMessages;
  $scope.currentUser = currentUser;
  $scope.joinGame = joinGame;
  $scope.createGame = createGame;
  $scope.createMessage = createMessage;
  
  function createGame(name) {
    GameService.createGame(name) //returns a promise
    .then(function (game) {
      GameService.joinGame(game.key()); //resolving the promise then updating the database to joining that game
      $location.path("/games/"+game.key()); //redirecting the game
    });
  }

  function joinGame(gameKey) {
    GameService.joinGame(gameKey);
    $location.path("/games/"+gameKey);
  }

  function createMessage(message) {
    MessageService.createMessage(null, currentUser, message, 'main');
    $scope.message = null;
  }
}

function GameCtrl($scope, $location, GameService, MessageService, game, roomMessages, mainMessages, currentUser) {
  build = {

  };

  $scope.game = game;
  $scope.channel = game.name;
  $scope.roomMessages = roomMessages;
  $scope.mainMessages = mainMessages;
  $scope.currentUser = currentUser;
  $scope.gameStarted = false;
  $scope.startGame = startGame;
  $scope.leaveGame = leaveGame;
  $scope.createMessage = createMessage;

  function startGame() {
    $scope.gameStarted = true;
    // fill in grid
    // start game
  }

  function leaveGame() {
    GameService.leaveGame(game.$id, currentUser);
    $location.path("/games");
  }

  function createMessage(message, channel) {
    MessageService.createMessage(game.$id, currentUser, message, channel);
    $scope.message = null;
  }

}
