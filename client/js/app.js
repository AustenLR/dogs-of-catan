var app = angular.module("ttt app", ["firebase", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider, $httpProvider){
  $routeProvider
  .when("/signup",{
    templateUrl: "partials/signup.html",
    controller: "AuthCtrl",
  })
  .when('/login',{
    templateUrl: 'partials/login.html',
    controller: "LoginCtrl"
  })
  .when("/games",{
    templateUrl: "partials/games.html",
    controller: "GamesCtrl",
    resolve: {
      games : function (GameService) {
        return GameService.getAllGames();
      },
      currentUser : function(UserService) {
        return UserService.getCurrentUser();
      }
    }
  })
  .when("/games/:id",{
    templateUrl: "partials/game.html",
    controller: "GameCtrl",
    resolve:{
      game: function(GameService, $route){
        return GameService.getGame($route.current.params.id);
      },
      currentUser: function(UserService) {
        return UserService.getCurrentUser();
      },
      messages: function(MessageService, $route){
        return MessageService.getAllMessages($route.current.params.id);
      }
    }
  });
  $locationProvider.html5Mode(true);
});
  