var app = angular.module("dogs-of-catan", ["firebase", "ngRoute"]);

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
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
      mainMessages: function(MessageService) {
        return MessageService.getMainMessages();
      },
      currentUser : function(AuthService) {
        return AuthService.getCurrentUser();
      }
    }
  })
  .when("/games/:id",{
    templateUrl: "partials/game.html",
    controller: "GameCtrl",
    resolve:{
      game: function(GameService, $route) {
        return GameService.getGame($route.current.params.id);
      },
      currentUser: function(AuthService) {
        return AuthService.getCurrentUser();
      },
      roomMessages: function(MessageService, $route) {
        return MessageService.getRoomMessages($route.current.params.id);
      },
      mainMessages: function(MessageService) {
        return MessageService.getMainMessages();
      }
    }
  });
  
  $locationProvider.html5Mode(true);
});
  