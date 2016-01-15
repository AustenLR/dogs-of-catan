app.controller("AuthCtrl", ["$scope", "$location", "UserService", "AuthService",
  function ($scope, $location, UserService, AuthService) {

    $scope.createUser = function (inputs) {
      $scope.message = null;
      $scope.error = null;
      
      AuthService.signup(inputs)
      .then(function () {
        AuthService.login(inputs)
        .then(function (authData) {
          UserService.setCurrentUser(authData);
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

app.controller("LoginCtrl", ["$scope", "$location", "UserService", "AuthService",
  function ($scope, $location, UserService, AuthService) {
    $scope.login = function (inputs) {
      $scope.message = null;
      $scope.error = null;
      
      AuthService.login(inputs)
      .then(function (authData) {
        UserService.setCurrentUser(authData);
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
      GameService.joinGame(gameKey,user);
      $location.path("/games/"+gameKey);
    };
    $scope.createGame = function(game, currentUser){
      game.length = 0;
      GameService.createGame(game, currentUser) //returns a promise
      .then(function (game) {
        GameService.joinGame(game.key(), currentUser); //resolving the promise then updating the database to joining that game
        $location.path("/games/"+game.key()); //redirecting the game
      });
    };
  }
]);

app.controller("GameCtrl", ["$scope", "$location", "GameService", "MessageService", "game", "messages", "currentUser",
  function ($scope, $location, GameService, MessageService, game, messages, currentUser) {
    game.length = Object.keys(game.users).length;
    $scope.game = game; //to display game info to the users
    $scope.messages = messages;
    $scope.createMessage = function(message){
      MessageService.createMessage(game.$id, currentUser, message);
    };
    $scope.leaveGame = function (){
      GameService.leaveGame(game.$id, currentUser);
      $location.path("/games");
    };
  }
]);




