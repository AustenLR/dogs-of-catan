app.service("firebaseRootService", firebaseRootService);
firebaseRootService.$inject = [
"FIREBASE_URL"];

function firebaseRootService(FIREBASE_URL) {
  var root = new Firebase(FIREBASE_URL);
  return {
    root: root,
    games: root.child("games"),
    messages: root.child("messages")
  };
}

app.service("AuthService", AuthService);
AuthService.$inject = ["firebaseRootService", 
"$firebaseAuth", 
"$firebaseObject", 
"$window"];

app.service("MessageService", MessageService);
MessageService.$inject = ["firebaseRootService", 
"$firebaseArray", 
"AuthService"];

app.service("CardService", CardService);
CardService.$inject = [];

app.service("GameService", GameService);
GameService.$inject = [
"firebaseRootService", 
"$firebaseObject", 
"$firebaseArray", 
"AuthService", 
"CardService",
"newGame",
"newPlayer"
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
  var messagesRef = firebaseRootService.messages;
  var currentUser = AuthService.getCurrentUser();

  var service = {
    createMessage: createMessage,
    getAllMessages: getAllMessages
  };

  return service;



  function createMessage(gameKey, currentUser, message) {
    var firebaseMessagesArray = $firebaseArray(messagesRef.child(gameKey));

    var newMessage = {};
    newMessage.sender = currentUser.username;
    newMessage.message = message;
    firebaseMessagesArray.$loaded()
    .then(function(messageArr) {
      messageArr.$add(newMessage);
    });
  }

  function getAllMessages(gameKey) {
    var messageRef = messagesRef.child(gameKey);
    var query = messageRef.limitToLast(25);
    return $firebaseArray(query).$loaded();
  }
}





// CARD SERVICE
function CardService() {

  var service = {
    getPlayerResources: getPlayerResources,
    checkCards: checkCards
  };

  return service;


  function getPlayerResources(players, playerName) {
    return players[playerName].cards.res;
  }

  function checkCards(playerRes, structure) { // cardReq = "settlement", "city", or "road"
    var cardReqs = {
      settlement: { h:1, l:1, w:1, b:1 },
      city: { h:2, o:3 },
      road: { b:1, l:1 }
    };

    var req = cardReqs[structure];

    for (var resource in req) {
      if (playerRes[resource] < req[resource]) return false;
    }
    return true;
  }
}

function BuildService() {

  var service = {};

  return service;

  function checkInt(players, intIndex) {
    for (var player in players) {
      var intersectionsOwned = players[player].intersectionsOwned;
      for (var inter in intersectionsOwned) {
        if (inter === intIndex) return false;
      }
    }
    return true;
  }
  
  function checkForRoad(intersection, playerName) {
    for (var inter in intersection.roads) {
      if (intersection.roads[inter] === playerName) return true;
    }
    return false;
  }

  function distanceRule(players, intObj) {
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




// GAME SERVICE
function GameService(firebaseRootService, $firebaseObject, $firebaseArray, AuthService, CardService, newGame, newPlayer) {
  var gamesRef = firebaseRootService.games;
  var games = $firebaseArray(gamesRef);           //grabbing all the games and presenting them into an array
  var currentUser = AuthService.getCurrentUser();
  var username = currentUser.username;

  var service = {
    createGame: createGame,
    getAllGames: getAllGames,
    getGame: getGame,
    joinGame: joinGame,
    leaveGame: leaveGame,
  };

  return service;



  function createGame(name) {
    // updating injected value "newGame"
    newGame.name = name;
    newGame.owner = currentUser.username;
    // adding the new game to the array, returns promise
    return games.$add(newGame);
  }

  function getAllGames() {
    return games.$loaded();
  }

  function getGame(gameKey) {
    return $firebaseObject(gamesRef.child(gameKey)).$loaded();
  }

  function joinGame(gameKey) {
    var gameLength = $firebaseObject(gamesRef.child(gameKey).child("length"));
    var players = $firebaseObject(gamesRef.child(gameKey).child("players")).$loaded();

    gameLength.$loaded().then(function (gameLength) {
      gameLength.$value += 1;
      gameLength.$save();
    });

    players.then(function (players) {
      // using injected value "newPlayer"
      players[currentUser.username] = newPlayer;
      players.$save();
    });
  }

  function leaveGame(gameKey, currentUser) {
    var gameLength = $firebaseObject(gamesRef.child(gameKey).child("length"));
    var user = $firebaseObject(gamesRef.child(gameKey).child("players").child(currentUser.username));

    gameLength.$loaded().then(function (gameLength) {
      gameLength.$value -= 1;
      gameLength.$save();
    });
    user.$remove();
  }
}

