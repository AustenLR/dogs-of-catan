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
"GamesService",
"MessageService",
"games",
"mainMessages",
"currentUser"
];

GameCtrl.$inject = [
"$scope",
"$location",
"GameFactory",
"GameService",
"MessageService",
"BuildService",
"CardService",
"PtsAndStructsService",
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

function GamesCtrl($scope, $location, GamesService, MessageService,
  games, mainMessages, currentUser) {

  $scope.games = games;
  $scope.mainMessages = mainMessages;
  $scope.currentUser = currentUser;
  $scope.joinGame = joinGame;
  $scope.createGame = createGame;
  $scope.createMessage = createMessage;
  
  function createGame(name) {
    GamesService.createGame(name) //returns a promise
    .then(function (game) {
      GamesService.joinGame(game.key()); //resolving the promise then updating the database to joining that game
      $location.path("/games/"+game.key()); //redirecting the game
    });
  }

  function joinGame(gameKey) {
    GamesService.joinGame(gameKey);
    $location.path("/games/"+gameKey);
  }

  function createMessage(message) {
    MessageService.createMessage(null, currentUser, message, 'main');
    $scope.message = null;
  }
}

function GameCtrl($scope, $location, GameFactory, GameService,
  MessageService, BuildService, CardService, PtsAndStructsService,
  game, roomMessages, mainMessages, currentUser) {

  var build = {
    settlement: buildSettlement,
    city: buildCity,
    road: buildRoad,
    initSettlement: buildSettlementInit,
    initRoad: buildRoadInit
  };

  var trade = {
    // withPlayer: tradeWithPlayer,
    // withBank: tradeWithBank
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
  $scope.build = build;
  $scope.trade = trade;


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


  // BUILD

  function buildSettlementInit(intIndex){
    var username = currentUser.username;
    var players = game.players;
    var intEmpty = BuildService.intersectionEmpty(players, intIndex);
    var tiles = game.tiles;
    var playerPoints = players[username].points;

    if (intEmpty){
      PtsAndStructsService.updateTilesAndIntsOwned(tiles, intIndex, username, players, "settlement");
      if (playerPoints === 1){
        var tilesArray = BuildService.findTileByIntersection(tiles, intIndex);
        var playerRes = CardService.getPlayerRes(players, username);
        var bankRes = game.bank.res;
        CardService.initThreeCards(playerRes, bankRes, tilesArray,tiles); 
      }
      game.$save();
      $scope.success = "built settlement correctly";
    } else {
      $scope.error = "Cannot build settlement here";
    }
  }

  function buildSettlement(intIndex) {
    var username = currentUser.username;
    var tiles = game.tiles;
    var ints = game.intersections;
    var players = game.players;
    var bankRes = game.bank.res;
    var intObj = game.intersections[intIndex];
    var playerRes = CardService.getPlayerRes(players, username);
    var cardCost = CardService.cardCostMet(playerRes, "settlement");
    var enoughSettlements = BuildService.structureCheck(players[username], "settlement");

    if (cardCost && enoughSettlements)
    {
      if (BuildService.settlementCheck(intIndex, intObj, players, username))
      {
        CardService.swapAllCards(playerRes, bankRes, cardCost);
        PtsAndStructsService.updateTilesAndIntsOwned(tiles, intIndex, username, players, "settlement");
        game.$save();
        if (PtsAndStructsService.checkForWin(players, username)) {
          // win game function
        }
        $scope.success = "built settlement correctly";
      }
      else
      {
        $scope.error = "Cannot build settlement here";
      }
    }
    else
    {
      $scope.error = "Not enough resources or settlements";
    }
  }

  function buildCity(intIndex){
    var username = currentUser.username;
    var players = game.players;
    var playerRes = CardService.getPlayerRes(players, username);
    var bankRes = game.bank.res;
    var cardCost = CardService.cardCostMet(playerRes, "city");
    var enoughCities = BuildService.structureCheck(players[username], "city");
    var ownsSettlement = BuildService.ownsSettlement(players[username], intIndex);

    if (cardCost && enoughCities && ownsSettlement){
      CardService.swapAllCards(playerRes, bankRes, cardCost);
      PtsAndStructsService.updateTilesAndIntsOwned(null, intIndex, username, players, "city"); //dont need tiles for city
      game.$save();
    }
    else
    {
      $scope.error = "Not enough resources or cities";
    }
  }

  function buildRoad(intIndex1, intIndex2) {
    var username = currentUser.username;
    var ints = game.intersections;
    var players = game.players;
    var bankRes = game.bank.res;
    var intObj1 = game.intersections[intIndex1];
    var intObj2 = game.intersections[intIndex2];
    var playerRes = CardService.getPlayerRes(players, username);
    var cardCost = CardService.cardCostMet(playerRes, "road");
    var enoughRoads = BuildService.structureCheck(players[username], "road");

    if (cardCost && enoughRoads)
    {
      if (BuildService.roadCheck(intIndex1, intIndex2, intObj1, intObj2, players, username))
      {
        CardService.swapAllCards(playerRes, bankRes, cardCost);
        PtsAndStructsService.updateRoads(intIndex1, intIndex2, intObj1, intObj2, players, username);
        game.$save();
        $scope.success = "built road correctly";
      }
      else
      {
        $scope.error = "Cannot build road here";
      }
    }
    else
    {
      $scope.error = "Not enough resources or roads";
    }
  }

  function buildRoadInit(intIndex1, intIndex2){
    var username = currentUser.username;
    var players = game.players;
    var player = players[username];
    var ints = game.intersections;
    var intObj1 = ints[intIndex1];
    var intObj2 = ints[intIndex2];
    var emptyRoad = BuildService.roadEmpty(intIndex2, intObj1);
    var placedSettlement = (BuildService.ownsSettlement(player, intIndex1) || BuildService.ownsSettlement(player, intIndex2));
    
    if (emptyRoad && placedSettlement){
      PtsAndStructsService.updateRoads(intIndex1, intIndex2, intObj1, intObj2, players, username);
      $scope.success = "built road correctly";
      game.$save();
    } else{
      $scope.error = "Cannot build road here";
    }
  }

  // TRADE
}
