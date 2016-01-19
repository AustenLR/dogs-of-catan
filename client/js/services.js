app.service("firebaseRootService", firebaseRootService);
firebaseRootService.$inject = ["FIREBASE_URL"];

function firebaseRootService(FIREBASE_URL) {
  var root = new Firebase(FIREBASE_URL);
  return {
    root: root,
    games: root.child("games"),
    messages: root.child("messages")
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
"$firebaseObject"
];

app.service("BuildService", BuildService);
BuildService.$inject = [
"CardService"
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
  var currentUser = AuthService.getCurrentUser();
  var MESSAGE_LIMIT = 25;

  var service = {
    createMessage: createMessage,
    getRoomMessages: getRoomMessages,
    getMainMessages: getMainMessages
  };

  return service;



  function createMessage(gameKey, currentUser, message, channel) {
    var messagesRef = roomMessagesRef.child((channel === "main") ? "main" : gameKey);
    var firebaseMessagesArray = $firebaseArray(messagesRef);
    
    var newMessage = {};
    newMessage.sender = currentUser.username;
    newMessage.message = message;
    firebaseMessagesArray.$add(newMessage);
  }

  function getRoomMessages(gameKey) {
    var messageRef = roomMessagesRef.child(gameKey);
    var query = messageRef.limitToLast(MESSAGE_LIMIT);
    return $firebaseArray(query).$loaded();
  }

  function getMainMessages() {
    var messageRef = roomMessagesRef.child("main");
    var query = messageRef.limitToLast(MESSAGE_LIMIT);
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
    leaveGame: leaveGame
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

}


// CARD SERVICE
function CardService($firebaseObject) {

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

  
  function swapAllCards(fromCardsRef, toCardsRef, totalCost) {
    for (var type in totalCost) {
      var count = totalCost[type];
      swapCards(fromCardsRef, toCardsRef, type, count);
    }

    function swapCards(fromCardsRef, toCardsRef, type, count) {
      var fromObj = $firebaseObject(fromCardsRef.child(type));
      var toObj = $firebaseObject(toCardsRef.child(type));

      fromObj.$loaded().then(function (fromCard) {
        fromCard.$value -= count;
        fromCard.$save();
      });

      toObj.$loaded().then(function (toCard) {
        toCard.$value += count;
        toCard.$save();
      });
    }
  }

  

  function getPlayerResources(players, playerName) {
    return players[playerName].cards.res;
  }

}


// BUILD SERVICE
function BuildService(CardService) {

  var service = {
    settlementCheck: settlementCheck,
    intersectionEmpty: intersectionEmpty,
    adjacentRoad: adjacentRoad,
    distanceRuleMet: distanceRuleMet
  };

  return service;


  function settlementCheck(intIndex, intObj, players, username) {
    return BuildService.intersectionEmpty(players, intIndex) &&
      BuildService.adjacentRoad(intObj, username) &&
      BuildService.distanceRuleMet(players, intObj);
  }

  function intersectionEmpty(players, intIndex) {
    for (var player in players) {
      var intsOwned = Object.keys(players[player].intersectionsOwned);
      if (intsOwned.indexOf(intIndex) > -1) return false;
    }
    return true;
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
      owned = owned.concat(Object.keys(players[player].intersectionsOwned));
    }
    for (var intersection in intObj.roads) {
      if (owned.indexOf(intersection) > -1) return false;
    }
    return true;
  }
}
