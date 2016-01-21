app.service("firebaseRootService", firebaseRootService);
firebaseRootService.$inject = ["FIREBASE_URL"];

function firebaseRootService(FIREBASE_URL) {
  var root = new Firebase(FIREBASE_URL);
  return {
    root: root,
    games: root.child("games"),
    messages: root.child("messages"),
    mainMessages: root.child("messages/main")
  };
}

app.service("AuthService", AuthService);
AuthService.$inject = [
"firebaseRootService",
"$firebaseAuth",
"$firebaseObject",
"$window"];

app.service("MessageService", MessageService);
MessageService.$inject = [
"firebaseRootService",
"$firebaseArray",
"AuthService"];

app.service("GamesService", GamesService);
GamesService.$inject = [
"firebaseRootService",
"$firebaseObject",
"$firebaseArray",
"AuthService",
"CardService",
"newGame",
"newPlayer"
];

app.service("GameService", GameService);
GameService.$inject = [
"firebaseRootService",
"$firebaseObject",
"AuthService",
"CardService"
];

app.service("CardService", CardService);
CardService.$inject = [

];

app.service("BuildService", BuildService);
BuildService.$inject = [
"CardService",
"PtsAndStructsService"
];

app.service("PtsAndStructsService", PtsAndStructsService);
PtsAndStructsService.$inject = [

];




// AUTH SERVICE
function AuthService(firebaseRootService, $firebaseAuth, $firebaseObject, $window) {
  var authRef = firebaseRootService.root;
  var firebaseAuthObject = $firebaseAuth(authRef);

  var service = {
    signup: signup,
    createUser: createUser,
    login: login,
    logout: logout,
    setCurrentUser: setCurrentUser,
    getCurrentUser: getCurrentUser
  };

  return service;



  function signup(inputs) {
    return firebaseAuthObject.$createUser(inputs);
  }

  function createUser(user) {
    // CODE???
  }

  function login(inputs) {
    return firebaseAuthObject.$authWithPassword(inputs);
  }

  function logout() {
    // $rootScope.$broadcast('logout');
    firebaseAuthObject.$unauth();
    $window.localStorage.setItem("currentUser", null);
  }

  function setCurrentUser(user) {
    user.username = user.password.email.split("@")[0];
    $window.localStorage.setItem("currentUser",JSON.stringify(user));
  }

  function getCurrentUser() {
    return JSON.parse($window.localStorage.getItem("currentUser"));
  }

}


// MESSAGE SERVICE
function MessageService(firebaseRootService, $firebaseArray, AuthService) {
  var roomMessagesRef = firebaseRootService.messages;
  var mainMessagesRef = firebaseRootService.mainMessages;
  var username = AuthService.getCurrentUser().username;
  var MESSAGE_LIMIT = 25;

  var service = {
    createMessage: createMessage,
    getRoomMessages: getRoomMessages,
    getMainMessages: getMainMessages
  };

  return service;



  function createMessage(gameKey, currentUser, message, channel) {
    var messagesRef = (channel === "main") ? mainMessagesRef : roomMessagesRef.child(gameKey);
    var firebaseMessagesArray = $firebaseArray(messagesRef);
    
    var newMessage = {};
    newMessage.sender = username;
    newMessage.message = message;
    firebaseMessagesArray.$add(newMessage);
  }

  function getRoomMessages(gameKey) {
    var messagesRef = roomMessagesRef.child(gameKey);
    var query = messagesRef.limitToLast(MESSAGE_LIMIT);
    return $firebaseArray(query).$loaded();
  }

  function getMainMessages() {
    var query = mainMessagesRef.limitToLast(MESSAGE_LIMIT);
    return $firebaseArray(query).$loaded();
  }
}


// GAMES SERVICE
function GamesService(firebaseRootService, $firebaseObject, $firebaseArray, AuthService, CardService, newGame, newPlayer) {
  var gamesRef = firebaseRootService.games; // grabs reference to list of all games
  var games = $firebaseArray(gamesRef);   // grabs list of all games as Array
  var currentUser = AuthService.getCurrentUser();
  var username = currentUser.username;

  var service = {
    createGame: createGame,
    getAllGames: getAllGames,
    joinGame: joinGame
  };

  return service;


  function createGame(name) {
    // updating injected value "newGame"
    newGame.name = name;
    newGame.owner = username;
    // adding the new game to the array, returns promise
    return games.$add(newGame);
  }

  function getAllGames() {
    return games.$loaded();
  }

  function joinGame(gameKey) {
    var gameLength = $firebaseObject(gamesRef.child(gameKey).child("length"));
    var players = $firebaseObject(gamesRef.child(gameKey).child("players")).$loaded();

    gameLength.$loaded().then(function (gameLength) {
      gameLength.$value += 1; // increment room size
      gameLength.$save();
    });

    players.then(function (players) {
      // using injected value "newPlayer"
      players[username] = newPlayer;  // enter room
      players.$save();
    });
  }
}

// GAME SERVICE
function GameService(firebaseRootService, $firebaseObject, AuthService, CardService) {
  var gamesRef = firebaseRootService.games;
  var currentUser = AuthService.getCurrentUser();
  var username = currentUser.username;

  var service = {
    getGame: getGame,
    leaveGame: leaveGame,
    getCurrentTurn: getCurrentTurn
  };

  return service;


  function getGame(gameKey) {
    return $firebaseObject(gamesRef.child(gameKey)).$loaded();
  }

  function leaveGame(gameKey, currentUser) {
    var gameLength = $firebaseObject(gamesRef.child(gameKey).child("length"));
    var user = $firebaseObject(gamesRef.child(gameKey).child("players").child(username));

    gameLength.$loaded().then(function (gameLength) {
      gameLength.$value -= 1; // decrement room size
      gameLength.$save();
    });
    user.$remove();  // leave room
  }

  function getCurrentTurn(game) {
    return game.turnOrder[game.turnIndex];
  }

}


// CARD SERVICE
function CardService() {

  var service = {
    getPlayerRes: getPlayerRes,
    getPlayerDev: getPlayerDev,
    cardCostMet: cardCostMet,
    swapAllCards: swapAllCards,
    getPlayerResources: getPlayerResources
  };

  return service;


  function getPlayerRes(players, player) {
    return players[player].cards.res;
  }
  
  function getPlayerDev(players, player) {
    return players[player].cards.dev;
  }

  function cardCostMet(playerCards, structure) {
    var cardReqs = {  // can add others like development
      settlement: { h:1, l:1, w:1, b:1 },
      city: { h:2, o:3 },
      road: { b:1, l:1 }
    };

    var req = cardReqs[structure];

    for (var resource in req) {
      if (playerCards[resource] < req[resource]) return false;
    }
    return req;
  }

  
  function swapAllCards(fromObj, toObj, totalCost) {
    for (var type in totalCost) {
      var count = totalCost[type];
      fromObj[type] -= count;
      toObj[type] += count;
    }
  }

  

  function getPlayerResources(players, playerName) {
    return players[playerName].cards.res;
  }

}


// BUILD SERVICE
function BuildService(CardService, PtsAndStructsService) {

  var service = {
    structureCheck: structureCheck,
    settlementCheck: settlementCheck,
    roadCheck: roadCheck,
    intersectionEmpty: intersectionEmpty,
    adjacentRoad: adjacentRoad,
    distanceRuleMet: distanceRuleMet,
    ownsSettlement: ownsSettlement
  };

  return service;


  function structureCheck(player, structure) {
    return player[structure] > 0;
  }

  function settlementCheck(intIndex, intObj, players, username) {
    return this.intersectionEmpty(players, intIndex) &&
      this.adjacentRoad(intObj, username) &&
      this.distanceRuleMet(players, intObj);
  }

  function roadCheck(intIndex1, intIndex2, intObj1, intObj2, players, username) {
    return (this.adjacentRoad(intObj1, username) || this.adjacentRoad(intObj2, username)) &&
      roadEmpty(intIndex2, intObj1);
  }

  function intersectionEmpty(players, intIndex) {
    for (var player in players) {
      var intsOwned = players[player].intersectionsOwned;
      if (intsOwned) {
        intsOwned = Object.keys(intsOwned);
        if (intsOwned.indexOf(intIndex) > -1) return false;
      }
    }
    return true;
  }

  function roadEmpty(intIndex2, intObj1) {
    return !intObj1.roads[intIndex2];
  }
  
  function adjacentRoad(intObj, username) {
    for (var intersection in intObj.roads) {
      if (intObj.roads[intersection] === username) return true;
    }
    return false;
  }

  function distanceRuleMet(players, intObj) { 
    var owned = [];
    for (var player in players) {
      var intsOwned = players[player].intersectionsOwned;
      if (intsOwned) {
        intsOwned = Object.keys(intsOwned);
        owned = owned.concat(intsOwned);
      }
    }
    for (var intersection in intObj.roads) {
      if (owned.indexOf(intersection) > -1) return false;
    }
    return true;
  }

  function ownsSettlement(player, intersection){ //check to confirm they own a settlement there to upgrade to city
    return player.intersectionsOwned.hasOwnProperty(intersection);
  }

}


// POINTS SERVICE
function PtsAndStructsService() {

  var service = {
    updateTilesAndIntsOwned: updateTilesAndIntsOwned,
    updateRoads: updateRoads,
    checkForWin: checkForWin
  };

  return service;


  // update players, tiles, ints, roads, points, etc. after building settlements, cities, and roads
  function updateTilesAndIntsOwned(tiles, intIndex, username, players, structure) {  // settlements and cities only
    if (structure === "settlement")
    {
      for (var tileKey in tiles) {
        var tileInts = tiles[tileKey].intersections;
        if (tileInts[intIndex]) tileInts[intIndex] = username;
      }
    }

    var player = players[username];
    player.intersectionsOwned = player.intersectionsOwned || {};
    var intsOwned = player.intersectionsOwned;
    intsOwned[intIndex] = intsOwned[intIndex] ? 2 : 1;  // if already owned => settlement to city, if not => nothing to settlment

    updatePointsAndStructs(player, structure);

    function updatePointsAndStructs(player, structure) {
      player[structure] -= 1;
      if (structure === "city") player.settlement += 1;
      // settlement total is +1, city total is +2 but can only be built on settlements so always +1
      player.points += 1;
    }
  }

  function updateRoads(intIndex1, intIndex2, intObj1, intObj2, players, username) {
    intObj1.roads[intIndex2] = username;
    intObj2.roads[intIndex1] = username;
    players[username].road -= 1;
  }

  function checkForWin(players, username) {
    return players[username].points >= 10;
  }
}